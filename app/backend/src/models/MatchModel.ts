import SequelizeTeam from '../database/models/SequelizeTeam';
import IMatch from '../Interfaces/matches/IMatch';
import SequelizeMatch from '../database/models/SequelizeMatch';

export default class MatchModel {
  private model = SequelizeMatch;

  async getAll(queryParam?: string): Promise<IMatch[]> {
    const dataWithParam = await this.model.findAll({
      include: [
        { model: SequelizeTeam, as: 'homeTeam', attributes: ['teamName'] },
        { model: SequelizeTeam, as: 'awayTeam', attributes: ['teamName'] },
      ],
      where: { inProgress: queryParam?.toLowerCase() === 'true' },
    });
    const data = await this.model.findAll({
      include: [
        { model: SequelizeTeam, as: 'homeTeam', attributes: ['teamName'] },
        { model: SequelizeTeam, as: 'awayTeam', attributes: ['teamName'] },
      ],
    });
    return queryParam ? dataWithParam : data;
  }

  async getById(id: number): Promise<IMatch | null> {
    const data = await this.model.findByPk(id);
    return data;
  }

  async finishMatch(id: IMatch['id']): Promise<IMatch | null> {
    const updatedMatch = await this.getById(id);

    if (!updatedMatch) return null;

    await this.model
      .update({ inProgress: false }, { where: { id } });

    return updatedMatch;
  }

  async updateScore(id: IMatch['id'], score: Partial<IMatch>) {
    const match = await this.getById(id);

    if (!match) return null;

    await this.model.update(score, { where: { id } });

    return match;
  }
}
