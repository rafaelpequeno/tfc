import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import SequelizeMatch from '../database/models/SequelizeMatch';
import { allMatches } from './mocks/matches.mock';
import SequelizeTeam from '../database/models/SequelizeTeam';
import { teams } from './mocks/teams.mock';
import { leaderboard, leaderboardAway, leaderboardHome } from './mocks/leaderboard.mock';

chai.use(chaiHttp);


const { expect } = chai;

describe('GET /leaderboard', function () {
  afterEach(function () { sinon.restore() })

  it('Should return teams stats in all games', async function () {
    const filteredMatches = allMatches.filter((match) => match.inProgress === false);

    sinon.stub(SequelizeMatch, 'findAll').resolves(filteredMatches as any);
    sinon.stub(SequelizeTeam, 'findAll').resolves(teams as any);

    const request = await chai.request(app).get('/leaderboard');

    expect(request.status).to.be.equal(200);
    expect(request.body).to.be.deep.equal(leaderboard);
  });
  it('Should return teams stats in home games', async function () {
    const filteredMatches = allMatches.filter((match) => match.inProgress === false);

    sinon.stub(SequelizeMatch, 'findAll').resolves(filteredMatches as any);
    sinon.stub(SequelizeTeam, 'findAll').resolves(teams as any);

    const request = await chai.request(app).get('/leaderboard/home');

    expect(request.status).to.be.equal(200);
    expect(request.body).to.be.deep.equal(leaderboardHome);
  });
  it('Should return teams stats in away games', async function () {
    const filteredMatches = allMatches.filter((match) => match.inProgress === false);

    sinon.stub(SequelizeMatch, 'findAll').resolves(filteredMatches as any);
    sinon.stub(SequelizeTeam, 'findAll').resolves(teams as any);

    const request = await chai.request(app).get('/leaderboard/away');

    expect(request.status).to.be.equal(200);
    expect(request.body).to.be.deep.equal(leaderboardAway);
  });
});
