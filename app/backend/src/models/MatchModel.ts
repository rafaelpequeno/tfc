import SequelizeTeam from '../database/models/SequelizeTeam';
import IMatch from '../Interfaces/matches/IMatch';
import SequelizeMatch from '../database/models/SequelizeMatch';

export default class MatchModel {
  private model = SequelizeMatch;

  async getAll(): Promise<IMatch[]> {
    const data = await this.model.findAll({
      include: [
        { model: SequelizeTeam, as: 'homeTeam', attributes: ['teamName'] },
        { model: SequelizeTeam, as: 'awayTeam', attributes: ['teamName'] },
      ],
    });
    return data;
  }
}
