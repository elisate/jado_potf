import { Request, Response } from "express";
import {
  createUser,
  getAllUsers,

} from "../models/userModel";

export const createUserController = async (req: Request, res: Response) => {
  try {
    const newUser = await createUser(req.body);
    res.status(201).json(newUser);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const getUsersController = async (_: Request, res: Response) => {
  try {
    const users = await getAllUsers();
    res.json(users);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};
