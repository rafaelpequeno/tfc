import { Request, Response } from 'express';
import LeaderboardService from '../service/LeaderboardService';

export default class LeaderboardController {
  constructor(
    private leaderboardService = new LeaderboardService(),
  ) { }

  public async getHome(_req: Request, res: Response) {
    const serviceResponse = await this.leaderboardService.getHome();

    return res.status(200).json(serviceResponse.data);
  }
}
