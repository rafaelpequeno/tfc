import { Request, Response } from 'express';
import TeamService from '../service/TeamService';

export default class TeamController {
  constructor(
    private teamService = new TeamService(),
  ) { }

  public async getAll(req: Request, res: Response) {
    const teams = await this.teamService.getAll();

    return res.status(200).json(teams);
  }
}
