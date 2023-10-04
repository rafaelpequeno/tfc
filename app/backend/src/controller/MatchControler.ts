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
}
