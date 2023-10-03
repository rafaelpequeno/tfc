import Imatch from './IMatch';

export interface ICRUDModelReader<T> {
  getAll(): Promise<T[]>;
}

export type IMatchModel = ICRUDModelReader<Imatch>;
