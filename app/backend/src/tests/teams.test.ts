import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Example from '../database/models/ExampleModel';

import { Response } from 'superagent';
import SequelizeTeam from '../database/models/SequelizeTeam';
import { teams } from './mocks/teams.mock'

chai.use(chaiHttp);


const { expect } = chai;

describe('GET /teams', function () {
  afterEach( function() { sinon.restore()})

  it('Should return all teams', async function () {
    sinon.stub(SequelizeTeam, 'findAll').resolves(teams.map((team) => SequelizeTeam.build(team)));

    const request = await chai.request(app).get('/teams');

    expect(request.status).to.be.equal(200);
    expect(request.body).to.be.deep.equal(teams);
  });
  it('Should return one team', async function () {
    sinon.stub(SequelizeTeam, 'findByPk').resolves(SequelizeTeam.build(teams[0]));

    const request = await chai.request(app).get('/teams/1');    

    expect(request.status).to.be.equal(200);
    expect(request.body).to.be.deep.equal(teams[0]);
  });
});
