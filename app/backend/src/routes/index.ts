import { Router } from 'express';
import teamRouter from './teams.routes';
import userRouter from './users.routes';

const router = Router();

router.use('/teams', teamRouter);
router.use('/teams/:id', teamRouter);

router.use('/login', userRouter);
router.use('/login/role', userRouter);

export default router;
