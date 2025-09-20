import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { BadRequestError } from '../error/index.js';
import { AppDataSource } from '../config/db.js';
import User  from '../entity/userEntity.js';
import Agent from '../entity/Agent.js';

dotenv.config();

export const test = (req, res) => {
  res.status(200).json({ message: 'Welcome to User Management' });
};

export const SignIn = async (req, res, next) => {
  try {
    const userRepo = AppDataSource.getRepository(User);
    const user = await userRepo.findOne({
      where: { email: req.body.email },
    });

    if (!user) return next(new BadRequestError('Invalid credentials'));

    const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
    if (!isPasswordValid) return next(new BadRequestError('Invalid password'));

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: '2h' }
    );

    res.status(200).json({
      success: true,
      message: 'Login successful',
      data: {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
        token: token,
      },
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Error occurred during login',
      data: err,
    });
  }
};

export const loginAsAgent = async (req, res) => {
  const { agentCode, password } = req.body;

  const agentRepo = AppDataSource.getRepository(Agent);
  const agent = await agentRepo.findOne({
    where: { agentCode },
    relations: ['user'],
  });

  if (!agent) {
    return res.status(404).json({ success: false, message: 'Agent not found' });
  }

  const user = agent.user;

  if (user.role !== 'agent') {
    return res.status(403).json({ success: false, message: 'User is not an agent' });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).json({ success: false, message: 'Invalid password' });
  }

  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      name: agent.name,
      role: user.role,
      agentCode: agent.agentCode,
    },
    process.env.JWT_SECRET_KEY,
    { expiresIn: '2h' }
  );

  return res.status(200).json({
    success: true,
    message: 'Login successful',
    data: {
      user: {
        id: user.id,
        name: agent.name,
        email: user.email,
        role: user.role,
        agentCode: agent.agentCode,
        branch: agent.branch,
        phoneNumber: agent.phoneNumber,
      },
      token,
    },
  });
};
