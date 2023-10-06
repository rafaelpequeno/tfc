import IUser from '../Interfaces/users/IUser';
import SequelizeUser from '../database/models/SequelizeUser';

export default class UserModel {
  private model = SequelizeUser;

  async getByEmail(email: string): Promise<IUser | null> {
    const user = await this.model.findOne({ where: { email } });

    if (!user) return null;

    return user?.toJSON();
  }

  async getById(id: number): Promise<IUser | null> {
    const user = await this.model.findOne({ where: { id } });

    if (!user) return null;

    return user.toJSON();
  }
}
