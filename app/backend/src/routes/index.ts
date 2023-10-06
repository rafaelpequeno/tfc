import { Router } from 'express';
import teamRouter from './teams.routes';
import userRouter from './users.routes';
import matchRouter from './matches.routes';
import leaderboardRouter from './leaderboard.routes';

const router = Router();

router.use('/teams', teamRouter);

router.use('/login', userRouter);

router.use('/matches', matchRouter);

router.use('/leaderboard', leaderboardRouter);

export default router;
