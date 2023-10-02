import { Request, Router, Response } from 'express';
import UserController from '../controller/UserController';
import usersVerifications from '../middlewares/login.middleware';

const userController = new UserController();

const router = Router();

router.post('/', usersVerifications, (req: Request, res: Response) =>
  userController.login(req, res));

router.get('/', (req: Request, res: Response) => userController.getRole(req, res));

export default router;
