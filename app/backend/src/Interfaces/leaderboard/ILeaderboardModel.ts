import { HomeOrAway } from '../../models/LeaderboardModel';
import ILeaderboard from './ILeaderboard';

export interface ICRUDModelReader<T> {
  getFilteredLeaderboard(homeOrAway: HomeOrAway): Promise<T[]>;
  getLeaderboard(): Promise<T[]>;
}

export type ILeaderboarModel = ICRUDModelReader<ILeaderboard>;
