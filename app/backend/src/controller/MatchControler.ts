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
}
