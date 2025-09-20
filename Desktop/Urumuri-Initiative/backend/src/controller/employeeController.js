import { AppDataSource } from '../config/db.js';
import Employee from '../entity/Employee.js';
import Organization from '../entity/Organization.js';
import { sendEmail } from '../utils/sendEmail.js';
export const addEmployee = async (req, res) => {
  const { name, employeeStatus, email, phone, salary, bankType, orgCode } = req.body;

  if (!orgCode) {
    return res.status(400).json({
      success: false,
      message: 'orgCode is required to assign employee to an organization',
    });
  }

  const orgRepo = AppDataSource.getRepository(Organization);
  const empRepo = AppDataSource.getRepository(Employee);

  // 🔍 Find organization by orgCode
  const organization = await orgRepo.findOne({ where: { orgCode } });

  if (!organization) {
    return res.status(404).json({
      success: false,
      message: 'Organization with the provided orgCode was not found',
    });
  }

  //  Create and link the employee
  const employee = empRepo.create({
    name,
    employeeStatus,
    email,
    phone,
    salary,
    bankType,
    organization: organization,
  });

  const savedEmployee = await empRepo.save(employee);

  res.status(201).json({
    success: true,
    message: 'Employee added successfully',
    employee: savedEmployee,
  });
};

export const getUnapprovedEmployees = async (req, res) => {
  const userId = req.user?.id;

  if (!userId) {
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  }

  const orgRepo = AppDataSource.getRepository(Organization);
  const empRepo = AppDataSource.getRepository(Employee);

  //  Find the organization linked to the logged-in user
  const organization = await orgRepo.findOne({
    where: { user: { id: userId } },
    relations: ['user'],
  });

  if (!organization) {
    return res.status(404).json({
      success: false,
      message: 'Organization not found for this user',
    });
  }

  //  Get only unapproved employees in that organization
  const employees = await empRepo.find({
    where: {
      approved: false,
      organization: { id: organization.id },
    },
    relations: ['organization'],
  });

  res.status(200).json({
    success: true,
    message: 'Unapproved employees retrieved successfully',
    employees,
  });
};
export const getApprovedEmployees= async (req, res) => {
  const userId = req.user?.id;

  if (!userId) {
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  }

  const orgRepo = AppDataSource.getRepository(Organization);
  const empRepo = AppDataSource.getRepository(Employee);

  //  Find the organization linked to the logged-in user
  const organization = await orgRepo.findOne({
    where: { user: { id: userId } },
    relations: ['user'],
  });

  if (!organization) {
    return res.status(404).json({
      success: false,
      message: 'Organization not found for this user',
    });
  }

  //  Get only approved employees in that organization
  const employees = await empRepo.find({
    where: {
      approved: true,
      organization: { id: organization.id },
    },
    relations: ['organization'],
  });

  res.status(200).json({
    success: true,
    message: 'Approved employees retrieved successfully',
    total: employees.length,
    employees,
  });
}
export const approveEmployee = async (req, res) => {
  const { id } = req.params;

  const empRepo = AppDataSource.getRepository(Employee);
  const employee = await empRepo.findOne({ where: { id } });

  if (!employee) {
    return res.status(404).json({
      success: false,
      message: 'Employee not found',
    });
  }

  employee.approved = true;
  await empRepo.save(employee);
  // Send email notification to the employee
  await sendEmail({
    recipient: employee.email,
    subject: 'Your Employment Status has been Updated',
    body: `Congratulations ${employee.name}, your employment status has been approved.`,
  });

  res.status(200).json({
    success: true,
    message: 'Employee approved successfully',
    employee,
  });
};

export const getEmployeesByOrganization = async (req, res) => {
  const userId = req.user?.id;
  if (!userId) {
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  }

  
  const orgRepo = AppDataSource.getRepository(Organization);
  const empRepo = AppDataSource.getRepository(Employee);

  const organization = await orgRepo.findOne({
    where: { user: { id: userId } },
    relations: ['user'],
  });

  if (!organization) {
    return res.status(404).json({ success: false, message: 'Organization not found' });
  }

  const employees = await empRepo.find({
    where: { organization: { id: organization.id } },
    relations: ['organization'],
  });

  res.status(200).json({
    success: true,
    message: 'Employees fetched successfully',
    employees,
  });
};

export const getEmployeeById = async (req, res) => {
  const { id } = req.params;

  const empRepo = AppDataSource.getRepository(Employee);

  const employee = await empRepo.findOne({
    where: { id },
    relations: ['organization'],
  });

  if (!employee) {
    return res.status(404).json({
      success: false,
      message: 'Employee not found',
    });
  }

  res.status(200).json({
    success: true,
    message: 'Employee fetched successfully',
    employee,
  });
};

export const updateEmployee = async (req, res) => {
  const { id } = req.params;
  const { name, employeeStatus, email, phone, salary, bankType } = req.body;

  const empRepo = AppDataSource.getRepository(Employee);
  const employee = await empRepo.findOne({ where: { id } });
  if (!employee) {
    return res.status(404).json({
      success: false,
      message: 'Employee not found',
    });
  }

  // Update fields only if they exist in req.body
  employee.name = name || employee.name;
  employee.employeeStatus = employeeStatus || employee.employeeStatus;
  employee.email = email || employee.email;
  employee.phone = phone || employee.phone;
  employee.salary = salary || employee.salary;
  employee.bankType = bankType || employee.bankType;

  const updatedEmployee = await empRepo.save(employee);

  res.status(200).json({
    success: true,
    message: 'Employee updated successfully',
    employee: updatedEmployee,
  });
};

export const deleteEmployee = async (req, res) => {
  const { id } = req.params;

  const empRepo = AppDataSource.getRepository(Employee);

  const employee = await empRepo.findOne({ where: { id } });

  if (!employee) {
    return res.status(404).json({
      success: false,
      message: 'Employee not found',
    });
  }

  await empRepo.remove(employee);

  res.status(200).json({
    success: true,
    message: 'Employee deleted successfully',
  });
};
