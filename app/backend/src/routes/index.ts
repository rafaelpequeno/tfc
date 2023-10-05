import { Router } from 'express';
import teamRouter from './teams.routes';
import userRouter from './users.routes';
import matchRouter from './matches.routes';

const router = Router();

router.use('/teams', teamRouter);
// router.use('/teams/:id', teamRouter);

router.use('/login', userRouter);
// router.use('/login/role', userRouter);

router.use('/matches', matchRouter);
// router.use('/matches/:id/finish', matchRouter);

export default router;
