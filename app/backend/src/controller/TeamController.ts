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

  public async getById(req: Request, res: Response) {
    const { id } = req.params;
    const team = await this.teamService.getById(Number(id));

    return res.status(200).json(team);
  }
}
