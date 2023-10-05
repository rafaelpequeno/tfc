import { RequestHandler } from 'express';
import TeamService from '../service/TeamService';

const teamService = new TeamService();

const validateMatchBody: RequestHandler = (req, res, next) => {
  const { homeTeamId, awayTeamId } = req.body;

  if (homeTeamId === awayTeamId) {
    return res.status(422).json({
      message: 'It is not possible to create a match with two equal teams',
    });
  }
  next();
};

const validateTeams: RequestHandler = async (req, res, next) => {
  const { homeTeamId, awayTeamId } = req.body;

  const isHomeTeamValid = await teamService.getById(homeTeamId);
  const isAwayTeamValid = await teamService.getById(awayTeamId);

  if (isHomeTeamValid.status === 'NOT_FOUND' || isAwayTeamValid.status === 'NOT_FOUND') {
    return res.status(404).json({
      message: 'There is no team with such id',
    });
  }
  next();
};

const matchValidations = [validateMatchBody, validateTeams];

export default matchValidations;
