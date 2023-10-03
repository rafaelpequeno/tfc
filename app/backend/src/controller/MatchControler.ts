import { Request, Response } from 'express';
import MatchService from '../service/MatchService';

export default class MatchController {
  constructor(
    private matchService = new MatchService(),
  ) { }

  public async getAll(_req: Request, res: Response) {
    const serviceResponse = await this.matchService.getAll();

    return res.status(200).json(serviceResponse.data);
  }
}
