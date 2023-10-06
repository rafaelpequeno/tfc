import ITeam from '../Interfaces/teams/ITeam';
import ILeaderboard from '../Interfaces/leaderboard/ILeaderboard';
import MatchModel from './MatchModel';
import TeamModel from './TeamModel';
import IMatch from '../Interfaces/matches/IMatch';

export type HomeOrAway = 'home' | 'away';

export default class LeaderboardModel {
  private matchs = new MatchModel();
  private teams = new TeamModel();

  static getMatches(id: number, matches: IMatch[], homeOrAway: HomeOrAway): IMatch[] {
    const teamMatches = matches.filter((match) => match[`${homeOrAway}TeamId`] === id);
    return teamMatches;
  }

  static teamName(id: number, teams: ITeam[]): string {
    const [findTeam] = teams.filter((team) => team.id === id);
    return findTeam.teamName;
  }

  static totalGames(id: number, matchs: IMatch[], homeOrAway: HomeOrAway): number {
    const teamMatches = this.getMatches(id, matchs, homeOrAway);
    return teamMatches.length;
  }

  static golsFavor(id: number, matchs: IMatch[], homeOrAway: HomeOrAway): number {
    const teamMatches = this.getMatches(id, matchs, homeOrAway);

    const totalGoalsFavor = teamMatches
      .map((match) => match[`${homeOrAway}TeamGoals`]).reduce((a, b) => a + b, 0);
    return totalGoalsFavor;
  }

  static golsAgainst(id: number, matchs: IMatch[], homeOrAway: HomeOrAway): number {
    const teamGames = this.getMatches(id, matchs, homeOrAway);
    const againstGolsHome = teamGames
      .map((match) => match.awayTeamGoals).reduce((a, b) => a + b, 0);
    const againstGolsAway = teamGames
      .map((match) => match.homeTeamGoals).reduce((a, b) => a + b, 0);

    const verification = homeOrAway === 'home' ? againstGolsHome : againstGolsAway;
    return verification;
  }

  static totalVictories(id: number, matchs: IMatch[], homeOrAway: HomeOrAway): number {
    const teamMatchs = this.getMatches(id, matchs, homeOrAway);

    let totalVictoriesHome = 0;
    let totalVictoriesAway = 0;

    teamMatchs.forEach((match) => {
      if (homeOrAway === 'home' && match.homeTeamGoals > match.awayTeamGoals) {
        totalVictoriesHome += 1;
      } else if (homeOrAway === 'away' && match.homeTeamGoals < match.awayTeamGoals) {
        totalVictoriesAway += 1;
      }
    });

    const verify = homeOrAway === 'home' ? totalVictoriesHome : totalVictoriesAway;

    return verify;
  }

  static totalDraws(id: number, matchs: IMatch[], homeOrAway: HomeOrAway): number {
    const teamMatchs = this.getMatches(id, matchs, homeOrAway);
    let totalDraws = 0;
    teamMatchs
      .forEach((match) => {
        if (match.homeTeamGoals === match.awayTeamGoals) totalDraws += 1;
      });
    return totalDraws;
  }

  static totalLosses(id: number, matchs: IMatch[], homeOrAway: HomeOrAway): number {
    const teamMatchs = this.getMatches(id, matchs, homeOrAway);
    let totalLossesHome = 0;
    let totalLossesAway = 0;
    teamMatchs.forEach((match) => {
      if (homeOrAway === 'home' && match.homeTeamGoals < match.awayTeamGoals) totalLossesHome += 1;
      if (homeOrAway === 'away' && match.homeTeamGoals > match.awayTeamGoals) totalLossesAway += 1;
    });
    const verify = homeOrAway === 'home' ? totalLossesHome : totalLossesAway;
    return verify;
  }

  static totalPoints(id: number, matchs: IMatch[], homeOrAway: HomeOrAway): number {
    const totalVictories = LeaderboardModel.totalVictories(id, matchs, homeOrAway);
    const totalDraws = LeaderboardModel.totalDraws(id, matchs, homeOrAway);
    const totalPoints = (totalVictories * 3) + totalDraws;
    return totalPoints;
  }

  static goalsBalance(id: number, matchs: IMatch[], homeOrAway: HomeOrAway) {
    const goalsFavor = LeaderboardModel.golsFavor(id, matchs, homeOrAway);
    const goalsOwn = LeaderboardModel.golsAgainst(id, matchs, homeOrAway);
    return goalsFavor - goalsOwn;
  }

  static efficiency(id: number, matches: IMatch[], homeOrAway: HomeOrAway): number {
    const totalPoints = LeaderboardModel.totalPoints(id, matches, homeOrAway);
    const totalGames = LeaderboardModel.totalGames(id, matches, homeOrAway);
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

  async getFilteredLeaderboard(homeOrAway: HomeOrAway): Promise<ILeaderboard[]> {
    const teams = await this.teams.getAll();
    const matches = await this.matchs.getAllFinished();
    const result = teams.map((team) => {
      const { id } = team;
      return {
        name: LeaderboardModel.teamName(id, teams),
        totalPoints: LeaderboardModel.totalPoints(id, matches, homeOrAway),
        totalGames: LeaderboardModel.totalGames(id, matches, homeOrAway),
        totalVictories: LeaderboardModel.totalVictories(id, matches, homeOrAway),
        totalDraws: LeaderboardModel.totalDraws(id, matches, homeOrAway),
        totalLosses: LeaderboardModel.totalLosses(id, matches, homeOrAway),
        goalsFavor: LeaderboardModel.golsFavor(id, matches, homeOrAway),
        goalsOwn: LeaderboardModel.golsAgainst(id, matches, homeOrAway),
        goalsBalance: LeaderboardModel.goalsBalance(id, matches, homeOrAway),
        efficiency: Number(LeaderboardModel.efficiency(id, matches, homeOrAway).toFixed(2)),
      };
    });
    return LeaderboardModel.sortResult(result);
  }
}
