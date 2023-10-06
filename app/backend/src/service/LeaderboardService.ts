import { ILeaderboarModel } from '../Interfaces/leaderboard/ILeaderboardModel';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import ILeaderboard from '../Interfaces/leaderboard/ILeaderboard';
import LeaderboardModel from '../models/LeaderboardModel';

export default class LeaderboardService {
  constructor(
    private leaderboardModel: ILeaderboarModel = new LeaderboardModel(),
  ) { }

  public async getHome(): Promise<ServiceResponse<ILeaderboard[]>> {
    const stats = await this.leaderboardModel.getHome();
    return { status: 'SUCCESSFUL', data: stats };
  }
}
