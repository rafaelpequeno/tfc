import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { allMatches } from './mocks/matches.mock';
import SequelizeMatch from '../database/models/SequelizeMatch';
import SequelizeUser from '../database/models/SequelizeUser';
import { userData } from './mocks/users.mock';

import * as jwt from 'jsonwebtoken';

chai.use(chaiHttp);


const { expect } = chai;

describe('GET /matches', function () {
  afterEach(function () { sinon.restore() })

  it('Should return all matches', async function () {
    sinon.stub(SequelizeMatch, 'findAll').resolves(allMatches as any);

    const request = await chai.request(app).get('/matches');

    expect(request.status).to.be.equal(200);
    expect(request.body).to.be.deep.equal(allMatches)
  });
  it('Should return all matches there are in progress', async function () {
    const filteredMatches = allMatches.filter((match) => match.inProgress === true);

    sinon.stub(SequelizeMatch, 'findAll').resolves(filteredMatches as any);

    const request = await chai.request(app).get('/matches?inProgress=true');

    expect(request.status).to.be.equal(200);
    expect(request.body).to.be.deep.equal(filteredMatches)
  });
  it('Should return all matches there are not in progress', async function () {
    const filteredMatches = allMatches.filter((match) => match.inProgress === false);

    sinon.stub(SequelizeMatch, 'findAll').resolves(filteredMatches as any);

    const request = await chai.request(app).get('/matches?inProgress=false');

    expect(request.status).to.be.equal(200);
    expect(request.body).to.be.deep.equal(filteredMatches)
  });
  describe('PATCH /matches/id/finish', function () {
    it('Should update the inProgress status', async function () {
      const testMatch = allMatches[41];

      sinon.stub(SequelizeUser, 'findOne').resolves(SequelizeUser.build(userData));
      sinon.stub(SequelizeMatch, 'findByPk').resolves(testMatch as any);

      const token = jwt.sign({
        id: 1,
        role: 'user',
      }, process.env.JWT_SECRET || 'secret');

      const request = await chai.request(app)
        .patch('/matches/42/finish')
        .set('Authorization', `Bearer ${token}`);

      expect(request.status).to.be.equal(200);
      expect(request.body).to.be.deep.equal({ message: 'Finished' })
    });
  })
  describe('PATCH /matches/id', function () {
    it('Should update the score', async function () {
      const body = {
        homeTeamScore: 3,
        awayTeamScore: 1
      }

      const testMatch = allMatches[41];

      sinon.stub(SequelizeUser, 'findOne').resolves(SequelizeUser.build(userData));
      sinon.stub(SequelizeMatch, 'findByPk').resolves(testMatch as any);

      const token = jwt.sign({
        id: 1,
        role: 'user',
      }, process.env.JWT_SECRET || 'secret');

      const request = await chai.request(app)
        .patch('/matches/42')
        .set('Authorization', `Bearer ${token}`)
        .send(body);

      expect(request.status).to.be.equal(200);
      expect(request.body).to.be.deep.equal({ message: 'Score Updated' })
    });
  })
  describe('POST /matches', function () {
    it('Should create a match successfully', async function () {
      const body = {
        homeTeamId: 16,
        awayTeamId: 8,
        homeTeamGoals: 2,
        awayTeamGoals: 2,
      };

      const result = {
        "id": 1,
        "homeTeamId": 16,
        "homeTeamGoals": 2,
        "awayTeamId": 8,
        "awayTeamGoals": 2,
        "inProgress": true
      }

      sinon.stub(SequelizeUser, 'findOne').resolves(SequelizeUser.build(userData));
      sinon.stub(SequelizeMatch, 'create').resolves(result as any);

      const token = jwt.sign({
        id: 1,
        role: 'user',
      }, process.env.JWT_SECRET || 'secret');

      const request = await chai.request(app)
        .post('/matches')
        .set('Authorization', `Bearer ${token}`)
        .send(body);

      expect(request.status).to.be.equal(201);
      expect(request.body).to.be.deep.equal(result)
    })
    it('Should not create a match with 2 equal teams', async function () {
      const body = {
        homeTeamId: 8,
        awayTeamId: 8,
        homeTeamGoals: 2,
        awayTeamGoals: 2,
      };

      sinon.stub(SequelizeUser, 'findOne').resolves(SequelizeUser.build(userData));
      sinon.stub(SequelizeMatch, 'create').resolves(null as any);

      const token = jwt.sign({
        id: 1,
        role: 'user',
      }, process.env.JWT_SECRET || 'secret');

      const request = await chai.request(app)
        .post('/matches')
        .set('Authorization', `Bearer ${token}`)
        .send(body);

      expect(request.status).to.be.equal(422);
      expect(request.body).to.be.deep.equal({ message: 'It is not possible to create a match with two equal teams' })
    })
    it('Should not create a match with a invalid team', async function () {
      const body = {
        homeTeamId: 8,
        awayTeamId: 68,
        homeTeamGoals: 2,
        awayTeamGoals: 2,
      };

      sinon.stub(SequelizeUser, 'findOne').resolves(SequelizeUser.build(userData));
      sinon.stub(SequelizeMatch, 'create').resolves(null as any);

      const token = jwt.sign({
        id: 1,
        role: 'user',
      }, process.env.JWT_SECRET || 'secret');

      const request = await chai.request(app)
        .post('/matches')
        .set('Authorization', `Bearer ${token}`)
        .send(body);

      expect(request.status).to.be.equal(404);
      expect(request.body).to.be.deep.equal({ message: 'There is no team with such id' })
    })
  })
});
