import Imatch from './IMatch';

export interface ICRUDModelReader<T> {
  getAll(queryParam?: string): Promise<T[]>;
  finishMatch(matchId: number): Promise<T | null>;
}

export type IMatchModel = ICRUDModelReader<Imatch>;
