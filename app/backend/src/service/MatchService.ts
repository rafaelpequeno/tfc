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
}
