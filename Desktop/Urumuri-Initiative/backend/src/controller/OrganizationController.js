import bcrypt from 'bcryptjs';
import { AppDataSource } from '../config/db.js';
import User, { UserRole } from '../entity/userEntity.js';
import Organization from '../entity/Organization.js';
import Agent from '../entity/Agent.js';
import cloudinary from '../utils/cloudinary.js';
import path from 'path';
import fs from 'fs'; 
import { sendEmail } from '../utils/sendEmail.js';

export const TestOrganization=async (req, res) => {
  try {
    // Your test logic here
    res.status(200).json({ message: "Test successful" });
  } catch (error) {
    console.error("TestOrganization Error:", error);
    res.status(500).json({ message: "Test failed" });
  }
};

export const createOrganization = async (req, res) => {
  const { fullName, location, email, phone, password, orgCode} = req.body;

  const userRepo = AppDataSource.getRepository(User);
  const orgRepo = AppDataSource.getRepository(Organization);
  const agentRepo = AppDataSource.getRepository(Agent);

  try {
    const existingUser = await userRepo.findOneBy({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'Email already in use' });
    }

    //  Upload certificate to Cloudinary
    let certificateUrl = null;
    if (req.file) {
      const filePath = path.resolve(req.file.path);
      const result = await cloudinary.uploader.upload(filePath, {
         resource_type: 'raw', // For non-image files like PDFs
         type:"upload",
        folder: 'organization_certificates',
        use_filename: true,
        unique_filename: false,
        overwrite: true,
       
      });
// console.log(process.env.CLOUD_NAME, process.env.CLOUD_KEY, process.env.CLOUD_SECRET);
      if (!result || !result.secure_url) {
        throw new Error('Failed to upload certificate to Cloudinary');
      }

      // console.log("Cloudinary Upload Result:", result);
      certificateUrl = result.secure_url;

      // Optional: Clean up local file
      fs.unlinkSync(filePath);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = userRepo.create({
      email,
      password: hashedPassword,
      role: UserRole.ORGANIZATION,
      name: fullName,
    });

    const savedUser = await userRepo.save(newUser);

    // Find agent by location/branch
    const assignedAgent = await agentRepo.findOneBy({ branch: location });

    const newOrg = orgRepo.create({
      fullName,
      location,
      email,
      phone,
      user: savedUser,
      agentCode: assignedAgent?.agentCode || null,
      certificateUrl,
    });

    const savedOrg = await orgRepo.save(newOrg);

    return res.status(201).json({
      success: true,
      message: 'Organization created successfully',
      data: {
        id: savedOrg.id,
        fullName: savedOrg.fullName,
        location: savedOrg.location,
        email: savedOrg.email,
        phone: savedOrg.phone,
        certificateUrl: savedOrg.certificateUrl,
        assignedAgent: assignedAgent
          ? {
              name: assignedAgent.name,
              email: assignedAgent.email,
              agentCode: assignedAgent.agentCode,
            }
          : null,
      },
    });
  } catch (err) {
    console.error('Create Org Error:', err);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};


export const getUnapprovedOrganizations = async (req, res) => {
  const agentCode = req.agentCode; 

  if (!agentCode) {
    return res.status(400).json({
      success: false,
      message: 'Agent code is required in request',
    });
  }

  const orgRepo = AppDataSource.getRepository(Organization);

  try {
    const unapprovedOrganizations = await orgRepo.find({
      where: {
        approved: false,
        agentCode: agentCode,
      },
      relations: ['user'],
    });

    res.status(200).json({
      success: true,
      message: 'Unapproved organizations retrieved successfully',
      total: unapprovedOrganizations.length,
      data: unapprovedOrganizations,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching unapproved organizations',
      error: error.message,
    });
  }
};


export const approveOrganization=async(req, res) => {
 const { id } = req.params;
 const agentCode = req.agentCode;
  if (!agentCode) {
    return res.status(401).json({ success: false, message: 'Agent code missing from token' });
  }
  const orgRepo = AppDataSource.getRepository(Organization);
  const agentRepo = AppDataSource.getRepository(Agent);
  const organization = await orgRepo.findOne({ where: { id }, relations: ['user'] });

  if (!organization) {
    return res.status(404).json({ success: false, message: 'Organization not found' });
  }

  organization.approved = true;
  organization.agentCode = agentCode;
  organization.orgCode= `ORG-${Date.now()}-${Math.floor(Math.random() * 1000)}`; // Generate unique orgCode
  const updatedOrg = await orgRepo.save(organization);
 
  //send email notification to organization
  await sendEmail({
    recipient:organization.email,
    subject: 'Organization Approved',
body: `
  <div style="font-family: Arial, sans-serif; line-height: 1.6;">
    <h2 style="color: #2E86C1;">Organization Approval Confirmation</h2>
    <p>Dear <strong>${organization.fullName}</strong>,</p>
    <p>We are pleased to inform you that your organization has been <strong>approved</strong>.</p>
    <p><strong>Organization Code:</strong> <code style="background-color: #f4f4f4; padding: 3px 6px; border-radius: 4px;">${organization.orgCode}</code></p>
    <p>You can now proceed to access all features available for approved organizations in our system.</p>
    <p>If you have any questions, feel free to contact us.</p>
    <br/>
    <p>Best regards,<br/>The Admin Team</p>
  </div>
`,

  })

 // Find the agent and update their activities
  const agent = await agentRepo.findOneBy({ agentCode });

  if (agent) {
    const newActivity = {
      action: 'Approve organization',
      date: new Date().toISOString(),
      organization: {
        id: updatedOrg.id,
        fullName: updatedOrg.fullName,
        email: updatedOrg.email,
      },
    };

    const currentActivities = Array.isArray(agent.activities) ? agent.activities : [];
    currentActivities.push(newActivity);
    agent.activities = currentActivities;

    await agentRepo.save(agent);
  }
  res.status(200).json({
    success: true,
    message: 'Organization approved successfully',
    data: updatedOrg.fullName,
  });
}

export const getApprovedOrganizations = async (req, res) => {
  const orgRepo = AppDataSource.getRepository(Organization);
  const approvedOrganizations = await orgRepo.find({
    where: { approved: true },
    relations: ['user'],
  });

  res.status(200).json({
    success: true,
    message: 'Approved organizations retrieved successfully',
    total: approvedOrganizations.length,
    data: approvedOrganizations,
  });
};

export const signContract = async (req, res) => {
  const { id } = req.params;
  const { signature, paymentMethod, agreed, duration } = req.body;

  // Validate input
  if (!signature || !paymentMethod || agreed !== true || !duration) {
    return res.status(400).json({
      success: false,
      message: 'Signature, payment method, agreement, and duration are required.',
    });
  }

  // Validate duration (minimum 6 months or "unlimited")
  const allowedDurations = ['6 months', '12 months', '24 months', 'unlimited'];
  if (!allowedDurations.includes(duration.toLowerCase())) {
    return res.status(400).json({
      success: false,
      message: 'Invalid duration. Must be at least 6 months or "unlimited".',
    });
  }

  // Upload to Cloudinary
  let signatureUrl;
  try {
    const uploadRes = await cloudinary.uploader.upload(signature, {
      folder: 'signatures',
    });
    signatureUrl = uploadRes.secure_url;
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Failed to upload signature' });
  }

  const orgRepo = AppDataSource.getRepository(Organization);
  const organization = await orgRepo.findOne({
    where: { id, approved: true },
    relations: ['employees'],
  });

  if (!organization) {
    return res.status(404).json({
      success: false,
      message: 'Organization not found or not approved',
    });
  }

  const approvedEmployees = organization.employees.filter(emp => emp.approved);

  const breakdown = approvedEmployees.map(emp => {
    const salary = parseFloat(emp.salary);
    const interest = salary * 0.06;
    return {
      employeeId: emp.id,
      employeeName: emp.name,
      salary,
      interest,
      total: salary + interest,
    };
  });

  const totalSalary = breakdown.reduce((sum, item) => sum + item.salary, 0);
  // const totalInterest = breakdown.reduce((sum, item) => sum + item.interest, 0);
  // const payableAmount = totalSalary;

  organization.signedContract = true;
  organization.contract = {
    signedAt: new Date(),
    signatureUrl,
    paymentMethod,
    duration, 
    agreedToTerms: agreed,
    totalSalary,
    numberOfEmployees: approvedEmployees.length,
    breakdown,
    name: organization.fullName,
    approvedByAgent: false,
  };

  const updatedOrg = await orgRepo.save(organization);

  return res.status(200).json({
    success: true,
    message: 'Contract signed and uploaded',
    contract: updatedOrg.contract,
  });
};

export const approveContract = async (req, res) => {
  const { id } = req.params;
  const { agentSignature } = req.body;
  const agentCode = req.agentCode; // this should come from your JWT middleware

  if (!agentSignature) {
    return res.status(400).json({ success: false, message: 'Agent signature is required.' });
  }

  if (!agentCode) {
    return res.status(403).json({ success: false, message: 'Unauthorized: agentCode missing from token' });
  }

  const orgRepo = AppDataSource.getRepository(Organization);
  const organization = await orgRepo.findOne({ where: { id } });

  if (!organization || !organization.signedContract) {
    return res.status(404).json({ success: false, message: 'Organization contract not found.' });
  }

  // 🔒 Check if the agentCode matches the assigned one
  if (organization.agentCode !== agentCode) {
    return res.status(403).json({
      success: false,
      message: 'You are not authorized to approve this contract.',
    });
  }

  // ⬆️ Upload signature to Cloudinary
  let signatureUrl;
  try {
    const uploadRes = await cloudinary.uploader.upload(agentSignature, {
      folder: 'signatures/agents',
    });
    signatureUrl = uploadRes.secure_url;
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Failed to upload agent signature' });
  }

  // ✅ Update contract fields
  organization.contract.approvedByAgent = true;
  organization.contract.agentSignatureUrl = signatureUrl;
  organization.contract.agentApprovedAt = new Date();

  const updated = await orgRepo.save(organization);

  return res.status(200).json({
    success: true,
    message: 'Contract approved successfully',
    contract: updated.contract,
  });
};





export const getOrganizationsByAgentCode = async (req, res) => {
  const agentCode = req.agentCode; // coming from token via middleware

  if (!agentCode) {
    return res.status(401).json({ message: 'Unauthorized: Agent code missing from token' });
  }

  try {
    const orgRepo = AppDataSource.getRepository(Organization);

    const organizations = await orgRepo.find({
      where: {
        agentCode,
        signedContract: true        // ✅ Only fetch orgs that already signed
      },
      relations: ['user'],
    });

    const filtered = organizations.filter(org => org.contract && org.contract.approvedByAgent === false);

    if (!filtered.length) {
      return res.status(404).json({ message: 'No signed contracts pending approval for this agent.' });
    }

    return res.status(200).json({
      total: filtered.length,
      organizations: filtered.map(org => ({
        id: org.id,
        fullName: org.fullName,
        location: org.location,
        email: org.email,
        phone: org.phone,
        agentCode: org.agentCode,
        createdAt: org.createdAt,
        contract: {
          signedAt: org.contract?.signedAt,
          signatureUrl: org.contract?.signatureUrl,
          paymentMethod: org.contract?.paymentMethod,
          totalSalary: org.contract?.totalSalary,
          numberOfEmployees: org.contract?.numberOfEmployees,
          breakdown: org.contract?.breakdown,
          approvedByAgent: org.contract?.approvedByAgent || false,
        }
      }))
    });
  } catch (error) {
    console.error('Error fetching organizations:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};


export const getAllOrganizations = async (req, res) => {
  const orgRepo = AppDataSource.getRepository(Organization);
  const organizations = await orgRepo.find();

  res.status(200).json({
    success:true,
    message:"All organization retrieved successfully",
    total: organizations.length,
    data:organizations,
  });
};
export const updateOrganization = async (req, res) => {
  const { id } = req.params;
  const { fullName, location, email, phone } = req.body;

  const orgRepo = AppDataSource.getRepository(Organization);
  const organization = await orgRepo.findOne({ where: { id }, relations: ['user'] });

  if (!organization) {
    return res.status(404).json({
      success:false,
      message: 'Organization not found' });
  }

  // Optional: update user email
  if (email && organization.user) {
    const userRepo = AppDataSource.getRepository(User);
    organization.user.email = email;
    await userRepo.save(organization.user);
  }

  organization.fullName = fullName || organization.fullName;
  organization.location = location || organization.location;
  organization.phone = phone || organization.phone;

  const updatedOrg = await orgRepo.save(organization);

  res.status(200).json({
    success:true,
    message: 'Organization updated successfully',
    data: updatedOrg,
  });
};

export const deleteOrganization = async (req, res) => {
  const { id } = req.params;

  const orgRepo = AppDataSource.getRepository(Organization);
  const organization = await orgRepo.findOne({
    where: { id },
    relations: ['user'],
  });

  if (!organization) {
    return res.status(404).json({ message: 'Organization not found' });
  }

  const userRepo = AppDataSource.getRepository(User);

  await orgRepo.remove(organization);
  await userRepo.remove(organization.user);

  res.status(200).json({ message: 'Organization and linked user deleted successfully' });
};



export const getOrganizationById = async (req, res) => {
  try {
    const { id } = req.params;

    const organizationRepo = AppDataSource.getRepository(Organization);

    const organization = await organizationRepo.findOne({
      where: { id },
      relations: ['user', 'employees'], // optional: include user & employees
    });

    if (!organization) {
      return res.status(404).json({
        success: false,
        message: 'Organization not found',
        data: null,
      });
    }

    res.status(200).json({
      success: true,
      message: 'Organization fetched successfully',
      data: organization,
    });
  } catch (error) {
    console.error('Error fetching organization by ID:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      data: null,
    });
  }
};

