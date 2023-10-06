import ITeam from '../Interfaces/teams/ITeam';
import ILeaderboard from '../Interfaces/leaderboard/ILeaderboard';
import MatchModel from './MatchModel';
import TeamModel from './TeamModel';
import IMatch from '../Interfaces/matches/IMatch';

export default class LeaderboardModel {
  private matchs = new MatchModel();
  private teams = new TeamModel();

  static teamName(id: number, teams: ITeam[]): string {
    const [findTeam] = teams.filter((team) => team.id === id);
    return findTeam.teamName;
  }

  static totalGames(id: number, matchs: IMatch[]): number {
    const totalGames = matchs.filter((match) => match.homeTeamId === id);
    return totalGames.length;
  }

  static golsFavor(id: number, matchs: IMatch[]): number {
    const totalGoals = matchs.filter((match) => match.homeTeamId === id);
    return totalGoals.map((match) => match.homeTeamGoals).reduce((a, b) => a + b, 0);
  }

  static golsAgainst(id: number, matchs: IMatch[]): number {
    const totalGoals = matchs.filter((match) => match.homeTeamId === id);
    return totalGoals.map((match) => match.awayTeamGoals).reduce((a, b) => a + b, 0);
  }

  static totalVictories(id: number, matchs: IMatch[]): number {
    const teamMatchs = matchs.filter((match) => match.homeTeamId === id);
    let totalVictories = 0;
    teamMatchs
      .forEach((match) => {
        if (match.homeTeamGoals > match.awayTeamGoals) {
          totalVictories += 1;
        }
      });
    return totalVictories;
  }

  static totalDraws(id: number, matchs: IMatch[]): number {
    const teamMatchs = matchs.filter((match) => match.homeTeamId === id);
    let totalDraws = 0;
    teamMatchs
      .forEach((match) => {
        if (match.homeTeamGoals === match.awayTeamGoals) totalDraws += 1;
      });
    return totalDraws;
  }

  static totalLosses(id: number, matchs: IMatch[]): number {
    const teamMatchs = matchs.filter((match) => match.homeTeamId === id);
    let totalLosses = 0;
    teamMatchs.forEach((match) => {
      if (match.homeTeamGoals < match.awayTeamGoals) totalLosses += 1;
    });
    return totalLosses;
  }

  static totalPoints(id: number, matchs: IMatch[]): number {
    const totalVictories = LeaderboardModel.totalVictories(id, matchs);
    const totalDraws = LeaderboardModel.totalDraws(id, matchs);
    const totalPoints = (totalVictories * 3) + totalDraws;
    return totalPoints;
  }

  static goalsBalance(id: number, matchs: IMatch[]) {
    const goalsFavor = LeaderboardModel.golsFavor(id, matchs);
    const goalsOwn = LeaderboardModel.golsAgainst(id, matchs);
    return goalsFavor - goalsOwn;
  }

  static efficiency(id: number, matches: IMatch[]): number {
    const totalPoints = LeaderboardModel.totalPoints(id, matches);
    const totalGames = LeaderboardModel.totalGames(id, matches);
    const result = (totalPoints / (totalGames * 3)) * 100;
    return result;
  }

  static sortResult(result: ILeaderboard[]) {
    const sortedResult = result
      .sort((a, b) => b.goalsFavor - a.goalsFavor)
      .sort((a, b) => b.goalsBalance - a.goalsBalance)
      .sort((a, b) => b.totalVictories - a.totalVictories)
      .sort((a, b) => b.totalPoints - a.totalPoints);

    return sortedResult;
  }

  async getHome(): Promise<ILeaderboard[]> {
    const teams = await this.teams.getAll();
    const matches = await this.matchs.getAllFinished();
    const result = teams.map((team) => {
      const { id } = team;
      return {
        name: LeaderboardModel.teamName(id, teams),
        totalPoints: LeaderboardModel.totalPoints(id, matches),
        totalGames: LeaderboardModel.totalGames(id, matches),
        totalVictories: LeaderboardModel.totalVictories(id, matches),
        totalDraws: LeaderboardModel.totalDraws(id, matches),
        totalLosses: LeaderboardModel.totalLosses(id, matches),
        goalsFavor: LeaderboardModel.golsFavor(id, matches),
        goalsOwn: LeaderboardModel.golsAgainst(id, matches),
        goalsBalance: LeaderboardModel.goalsBalance(id, matches),
        efficiency: Number(LeaderboardModel.efficiency(id, matches).toFixed(2)),
      };
    });
    return LeaderboardModel.sortResult(result);
  }
}
