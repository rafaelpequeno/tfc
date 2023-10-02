import { Request, Response } from 'express';
import UserService from '../service/UserService';

export default class UserController {
  constructor(
    private userService = new UserService(),
  ) { }

  public async login(req: Request, res: Response) {
    const { email, password } = req.body;

    const serviceResponse = await this.userService.login(email, password);

    if (serviceResponse.status !== 'SUCCESSFUL') {
      return res.status(400).json(serviceResponse.data);
    }

    return res.status(200).json(serviceResponse.data);
  }

  public async getRole(req: Request, res: Response) {
    const { authorization } = req.headers;

    const serviceResponse = await this.userService.getRole(authorization);

    if (serviceResponse.status !== 'SUCCESSFUL') {
      return res.status(401).json(serviceResponse.data);
    }

    return res.status(200).json(serviceResponse.data);
  }
}
