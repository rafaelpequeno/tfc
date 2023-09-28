import TeamModel from '../models/TeamModel';
import ITeam from '../Interfaces/teams/ITeam';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import { ITeamModel } from '../Interfaces/teams/ITeamModel';

export default class TeamService {
  constructor(
    private teamModel: ITeamModel = new TeamModel(),
  ) {}

  public async getAll(): Promise<ServiceResponse<ITeam[]>> {
    const teams = await this.teamModel.getAll();
    return { status: 'SUCCESSFUL', data: teams };
  }

  public async getById(teamId: number): Promise<ServiceResponse<ITeam>> {
    const team = await this.teamModel.getById(teamId);

    if (!team) {
      return { status: 'NOT_FOUND', data: { message: 'Team not found' } };
    }

    return { status: 'SUCCESSFUL', data: team };
  }
}
