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
      role: user.role,
    }, process.env.JWT_SECRET || 'secret');

    return { status: 'SUCCESSFUL', data: { token } };
  }
}
