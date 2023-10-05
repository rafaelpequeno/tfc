import Imatch from './IMatch';

export interface ICRUDModelReader<T> {
  getAll(queryParam?: string): Promise<T[]>;
  finishMatch(matchId: number): Promise<T | null>;
  updateScore(matchId: number, score: Partial<Imatch>): Promise<T | null>;
}

export type IMatchModel = ICRUDModelReader<Imatch>;
