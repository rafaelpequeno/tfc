import { Request, Router, Response } from 'express';
import MatchController from '../controller/MatchControler';
import verifyToken from '../middlewares/auth.middleware';
import matchValidations from '../middlewares/matches.middleware';

const matchController = new MatchController();

const router = Router();

router.get('/', (req: Request, res: Response) =>
  matchController.getAll(req, res));

router.patch('/:id/finish', verifyToken, (req: Request, res: Response) =>
  matchController.finishMatch(req, res));

router.patch('/:id', verifyToken, (req: Request, res: Response) =>
  matchController.updateScore(req, res));

router.post('/', verifyToken, matchValidations, (req: Request, res: Response) =>
  matchController.create(req, res));

export default router;
