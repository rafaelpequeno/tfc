import IUser from './IUser';

export interface ICRUDModelReader<T> {
  getByEmail(email: string): Promise<T | null>;
  getById(id: number): Promise<T | null>;
}

export type IUserModel = ICRUDModelReader<IUser>;
