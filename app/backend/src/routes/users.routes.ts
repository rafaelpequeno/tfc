import { Request, Router, Response } from 'express';
import UserController from '../controller/UserController';
import usersVerifications from '../middlewares/login.middleware';
import verifyToken from '../middlewares/auth.middleware';

const userController = new UserController();

const router = Router();

router.post('/', usersVerifications, (req: Request, res: Response) =>
  userController.login(req, res));

router.get('/role', verifyToken, (req: Request, res: Response) => UserController.getRole(req, res));

export default router;
