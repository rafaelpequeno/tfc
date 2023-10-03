import { ServiceResponse } from '../Interfaces/ServiceResponse';
import { IMatchModel } from '../Interfaces/matches/IMatchModel';
import MatchModel from '../models/MatchModel';
import IMatch from '../Interfaces/matches/IMatch';

export default class MatchService {
  constructor(
    private matchModel: IMatchModel = new MatchModel(),
  ) {}

  public async getAll(): Promise<ServiceResponse<IMatch[]>> {
    const matches = await this.matchModel.getAll();
    return { status: 'SUCCESSFUL', data: matches };
  }
}
