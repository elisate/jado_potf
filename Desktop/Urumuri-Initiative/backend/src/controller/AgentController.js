import bcrypt from 'bcryptjs';
import { AppDataSource } from '../config/db.js';
import {UserRole}  from '../entity/userEntity.js';
import User from '../entity/userEntity.js';
import  Agent  from '../entity/Agent.js';
import {sendEmail} from '../utils/sendEmail.js';
import { ILike } from 'typeorm';

export const createAgent = async (req, res) => {
  const { name, email, password, branch, phoneNumber } = req.body;

  const userRepo = AppDataSource.getRepository(User);
  const agentRepo = AppDataSource.getRepository(Agent);

  const existingUser = await userRepo.findOneBy({ email });
  if (existingUser) {
    return res.status(400).json({ message: 'Email already in use' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = userRepo.create({
    name,
    email,
    password: hashedPassword,
    role: UserRole.AGENT,
  });

  const savedUser = await userRepo.save(newUser);

  const agent = agentRepo.create({
    name,
    branch,
    agentCode: `AGT-${Date.now()}${Math.floor(Math.random() * 1000000)}`,
    email,
    phoneNumber,
    user: savedUser,
  });

  const savedAgent = await agentRepo.save(agent);

  // Send credentials via email
  await sendEmail({
    recipient: savedAgent.email,
    subject: "Agent Information",
    body: `Your credential is ${savedAgent.agentCode} and password is ${req.body.password}`,
  });

  res.status(201).json({
    message: 'Agent created',
    agent: {
      id: savedAgent.id,
      name: savedAgent.name,
      branch: savedAgent.branch,
      email: savedUser.email,
      agentCode: savedAgent.agentCode,
    },
  });
};

export const getAgentsByBranch = async (req, res) => {
  const { branch } = req.params;

  const agentRepo = AppDataSource.getRepository(Agent);

  const agents = await agentRepo.find({
    where: { branch: ILike(branch) },
    relations: ['user'],
  });

  if (!agents.length) {
    return res.status(404).json({ message: `No agents found in branch: ${branch}` });
  }

  res.status(200).json({
    total: agents.length,
    agents: agents.map(agent => ({
      id: agent.id,
      name: agent.name,
      branch: agent.branch,
      email: agent.email,
      phoneNumber: agent.phoneNumber,
      agentCode: agent.agentCode,
      createdAt: agent.createdAt,
    })),
  });
};

export const updateAgent = async (req, res) => {
  const { id } = req.params;
  const { name, branch, phoneNumber, email } = req.body;

  const agentRepo = AppDataSource.getRepository(Agent);
  const agent = await agentRepo.findOne({
    where: { id },
    relations: ['user'],
  });

  if (!agent) {
    return res.status(404).json({ message: 'Agent not found' });
  }

  // Update linked user email if provided
  if (email) {
    const userRepo = AppDataSource.getRepository(User);
    agent.user.email = email;
    await userRepo.save(agent.user);
  }

  // Update agent fields
  agent.name = name || agent.name;
  agent.branch = branch || agent.branch;
  agent.phoneNumber = phoneNumber || agent.phoneNumber;

  const updatedAgent = await agentRepo.save(agent);

  res.status(200).json({
    message: 'Agent updated successfully',
    agent: {
      id: updatedAgent.id,
      name: updatedAgent.name,
      branch: updatedAgent.branch,
      email: updatedAgent.email,
      phoneNumber: updatedAgent.phoneNumber,
      agentCode: updatedAgent.agentCode,
    },
  });
};

export const deleteAgent = async (req, res) => {
  const { id } = req.params;

  const agentRepo = AppDataSource.getRepository(Agent);
  const agent = await agentRepo.findOne({
    where: { id },
    relations: ['user'],
  });

  if (!agent) {
    return res.status(404).json({ message: 'Agent not found' });
  }

  const userRepo = AppDataSource.getRepository(User);

  await agentRepo.remove(agent);
  await userRepo.remove(agent.user);

  res.status(200).json({ message: 'Agent and user account deleted successfully' });
};

export const getAgentById = async (req, res) => {
  const { id } = req.params;

  const agentRepo = AppDataSource.getRepository(Agent);

  const agent = await agentRepo.findOne({
    where: { id },
    relations: ['user'],
  });

  if (!agent) {
    return res.status(404).json({ message: 'Agent not found' });
  }

  res.status(200).json({
    id: agent.id,
    name: agent.name,
    branch: agent.branch,
    phoneNumber: agent.phoneNumber,
    email: agent.email,
    agentCode: agent.agentCode,
    createdAt: agent.createdAt,
  });
};

export const getAllAgents = async (req, res) => {
  try {
    const agentRepo = AppDataSource.getRepository(Agent);
    const agents = await agentRepo.find();

    res.status(200).json({
      success: true,
      message: 'All agents retrieved successfully',
      total: agents.length,
      data: agents,
    });
  } catch (error) {
    console.error('Error fetching agents:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const getAgentActivities = async (req, res) => {
  const agentCode = req.agentCode;

  try {
    const agentRepo = AppDataSource.getRepository(Agent);
    const agent = await agentRepo.findOneBy({ agentCode });

    if (!agent) {
      return res.status(404).json({
        success: false,
        message: 'Agent not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Agent activities retrieved successfully',
      activities: agent.activities || [],
    });
  } catch (error) {
    console.error('Error fetching activities:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};
