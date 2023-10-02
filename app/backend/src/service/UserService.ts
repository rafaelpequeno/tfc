import * as jwt from 'jsonwebtoken';
import { IUserModel } from '../Interfaces/users/IUserModel';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import UserModel from '../models/UserModel';

export default class UserService {
  constructor(
    private userModel: IUserModel = new UserModel(),
  ) {}

  public async login(email: string, _password: string):
  Promise<ServiceResponse<{ token: string }>> {
    const user = await this.userModel.getByEmail(email);

    if (!user) {
      return { status: 'UNAUTHORIZED', data: { message: 'All fields must be filled' } };
    }

    const token = jwt.sign({
      id: user.id,
    }, process.env.JWT_SECRET || 'secret');

    return { status: 'SUCCESSFUL', data: { token } };
  }

  public async getRole(authorization: string | undefined):
  Promise<ServiceResponse<{ role: string }>> {
    const token = authorization?.split(' ')[1];

    const payload = jwt.verify(token || '', process.env.JWT_SECRET || 'secret') as { id: number };

    const user = await this.userModel.getById(payload.id);

    if (!user) {
      return { status: 'UNAUTHORIZED', data: { message: 'Token not found' } };
    }

    return { status: 'SUCCESSFUL', data: { role: user.role } };
  }
}
