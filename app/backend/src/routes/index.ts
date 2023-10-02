import { Router } from 'express';
import teamRouter from './teams.routes';
import userRouter from './users.routes';
import verifyToken from '../middlewares/auth.middleware';

const router = Router();

router.use('/teams', teamRouter);
router.use('/teams/:id', teamRouter);

router.use('/login', userRouter);
router.use('/login/role', verifyToken, userRouter);

export default router;
