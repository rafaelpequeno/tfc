import { Request, Response } from 'express';
import TeamService from '../service/TeamService';

export default class TeamController {
  constructor(
    private teamService = new TeamService(),
  ) { }

  public async getAll(_req: Request, res: Response) {
    const serviceResponse = await this.teamService.getAll();

    return res.status(200).json(serviceResponse.data);
  }

  public async getById(req: Request, res: Response) {
    const { id } = req.params;
    const serviceResponse = await this.teamService.getById(Number(id));

    return res.status(200).json(serviceResponse.data);
  }
}
