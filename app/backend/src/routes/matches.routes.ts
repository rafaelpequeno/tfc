import { Request, Router, Response } from 'express';
import MatchController from '../controller/MatchControler';

const matchController = new MatchController();

const router = Router();

router.get('/', (req: Request, res: Response) =>
  matchController.getAll(req, res));

export default router;
