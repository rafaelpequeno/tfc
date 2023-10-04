import Imatch from './IMatch';

export interface ICRUDModelReader<T> {
  getAll(queryParam?: string): Promise<T[]>;
}

export type IMatchModel = ICRUDModelReader<Imatch>;
