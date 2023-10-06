import ILeaderboard from './ILeaderboard';

export interface ICRUDModelReader<T> {
  getHome(): Promise<T[]>;
}

export type ILeaderboarModel = ICRUDModelReader<ILeaderboard>;
