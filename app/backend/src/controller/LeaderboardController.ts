import { Request, Response } from 'express';
import LeaderboardService from '../service/LeaderboardService';

export default class LeaderboardController {
  constructor(
    private leaderboardService = new LeaderboardService(),
  ) { }

  public async getHome(_req: Request, res: Response) {
    const serviceResponse = await this.leaderboardService.getFilteredLeaderboard('home');

    return res.status(200).json(serviceResponse.data);
  }

  public async getAway(_req: Request, res: Response) {
    const serviceResponse = await this.leaderboardService.getFilteredLeaderboard('away');

    return res.status(200).json(serviceResponse.data);
  }

  public async getAll(_req: Request, res: Response) {
    const serviceResponse = await this.leaderboardService.getLeaderboard();

    return res.status(200).json(serviceResponse.data);
  }
}
