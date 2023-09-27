import { Request, Router, Response } from 'express';
import TeamController from '../controller/TeamController';

const teamController = new TeamController();

const router = Router();

router.get('/', (req: Request, res: Response) =>
  teamController.getAll(req, res));

export default router;
