import ITeam from '../Interfaces/teams/ITeam';
import SequelizeTeam from '../database/models/SequelizeTeam';

export default class TeamModel {
  private model = SequelizeTeam;

  async getAll(): Promise<ITeam[]> {
    const data = await this.model.findAll();
    return data.map(({ dataValues }) => ({ ...dataValues }));
  }
}
