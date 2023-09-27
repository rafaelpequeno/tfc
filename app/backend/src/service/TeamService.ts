import TeamModel from '../models/TeamModel';
import { ICRUDModelReader } from '../Interfaces/ICRUDModel';
import ITeam from '../Interfaces/teams/ITeam';

export default class TeamService {
  constructor(
    private teamModel: ICRUDModelReader<ITeam> = new TeamModel(),
  ) {}

  public async getAll(): Promise<ITeam[]> {
    const teams = await this.teamModel.getAll();
    return teams;
  }
}
