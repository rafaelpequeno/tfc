import { NextFunction, Request, Response } from 'express';
import * as bcrypt from 'bcryptjs';
import UserModel from '../models/UserModel';

const userModel = new UserModel();
const message = 'Invalid email or password';

const verifyEmail = async (req: Request, res: Response, next: NextFunction) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: 'All fields must be filled' });
  }

  const isValidEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const user = await userModel.getByEmail(email);

  if (!isValidEmail.test(email)) {
    return res.status(401).json({ message });
  }

  if (email !== user?.email) {
    return res.status(401).json({ message });
  }

  next();
};

const verifyPassword = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  const user = await userModel.getByEmail(email);

  if (!user || !password) {
    return res.status(400).json({ message: 'All fields must be filled' });
  }

  if (password.length < 6) {
    return res.status(401).json({ message });
  }

  const isValidPassword = await bcrypt.compare(password, user.password);

  if (!isValidPassword) {
    return res.status(401).json({ message });
  }

  next();
};

const usersVerifications = [verifyEmail, verifyPassword];

export default usersVerifications;
