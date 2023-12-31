import { ServiceMessage, ServiceResponse } from '../Interfaces/ServiceResponse';
import { IMatchModel } from '../Interfaces/matches/IMatchModel';
import MatchModel from '../models/MatchModel';
import IMatch from '../Interfaces/matches/IMatch';

export default class MatchService {
  constructor(
    private matchModel: IMatchModel = new MatchModel(),
  ) { }

  public async getAll(queryParam?: string): Promise<ServiceResponse<IMatch[]>> {
    const matches = await this.matchModel.getAll(queryParam);
    return { status: 'SUCCESSFUL', data: matches };
  }

  public async finishMatch(id: IMatch['id']): Promise<ServiceResponse<ServiceMessage>> {
    const match = await this.matchModel.finishMatch(id);

    if (!match) {
      return { status: 'NOT_FOUND', data: { message: 'Match not found' } };
    }

    return { status: 'SUCCESSFUL', data: { message: 'Finished' } };
  }

  public async updateScore(id: IMatch['id'], score: Partial<IMatch>):
  Promise<ServiceResponse<ServiceMessage>> {
    const matchToUpdate = await this.matchModel.updateScore(id, score);

    if (!matchToUpdate) {
      return { status: 'NOT_FOUND', data: { message: 'Match not found' } };
    }

    return { status: 'SUCCESSFUL', data: { message: 'Score Updated' } };
  }

  public async create(match: IMatch): Promise<ServiceResponse<IMatch>> {
    const matchToCreate = await this.matchModel.create(match);

    if (!matchToCreate) {
      return { status: 'INVALID_DATA', data: { message: 'Something went wrong' } };
    }

    return { status: 'SUCCESSFUL', data: matchToCreate };
  }
}
