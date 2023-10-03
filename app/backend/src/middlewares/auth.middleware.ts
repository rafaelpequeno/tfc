import { RequestHandler } from 'express';
import * as jwt from 'jsonwebtoken';

const verifyToken: RequestHandler = (req, res, next) => {
  const { authorization } = req.headers;
  const secret = process.env.JWT_SECRET;
  if (!authorization) {
    return res.status(401).json({ message: 'Token not found' });
  }
  const token = authorization.split(' ')[1];

  try {
    jwt.verify(token, secret || 'secret');
    res.locals = jwt.decode(token) as { id: number, role: string };
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }
};

export default verifyToken;
