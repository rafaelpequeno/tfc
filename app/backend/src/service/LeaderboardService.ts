import { ILeaderboarModel } from '../Interfaces/leaderboard/ILeaderboardModel';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import ILeaderboard from '../Interfaces/leaderboard/ILeaderboard';
import LeaderboardModel, { HomeOrAway } from '../models/LeaderboardModel';

export default class LeaderboardService {
  constructor(
    private leaderboardModel: ILeaderboarModel = new LeaderboardModel(),
  ) { }

  public async getFilteredLeaderboard(homeOrAway: HomeOrAway):
  Promise<ServiceResponse<ILeaderboard[]>> {
    const stats = await this.leaderboardModel.getFilteredLeaderboard(homeOrAway);
    return { status: 'SUCCESSFUL', data: stats };
  }
}
