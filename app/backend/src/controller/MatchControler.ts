import { Request, Response } from 'express';
import MatchService from '../service/MatchService';

export default class MatchController {
  constructor(
    private matchService = new MatchService(),
  ) { }

  public async getAll(req: Request, res: Response) {
    const { inProgress } = req.query;

    const serviceResponse = await this.matchService.getAll(inProgress as string);

    return res.status(200).json(serviceResponse.data);
  }

  public async finishMatch(req: Request, res: Response) {
    const id = Number(req.params.id);

    const serviceResponse = await this.matchService.finishMatch(id);

    if (serviceResponse.status === 'NOT_FOUND') {
      return res.status(404).json(serviceResponse.data);
    }

    return res.status(200).json(serviceResponse.data);
  }

  public async updateScore(req: Request, res: Response) {
    const id = Number(req.params.id);
    const score = req.body;

    const serviceResponse = await this.matchService.updateScore(id, score);

    if (serviceResponse.status !== 'SUCCESSFUL') {
      return res.status(404).json(serviceResponse.data);
    }

    return res.status(200).json(serviceResponse.data);
  }

  public async create(req: Request, res: Response) {
    const match = req.body;

    const serviceResponse = await this.matchService.create(match);

    if (serviceResponse.status !== 'SUCCESSFUL') {
      return res.status(400).json(serviceResponse.data);
    }

    return res.status(201).json(serviceResponse.data);
  }
}
