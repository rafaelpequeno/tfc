import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { allMatches } from './mocks/matches.mock';
import SequelizeMatch from '../database/models/SequelizeMatch';

chai.use(chaiHttp);


const { expect } = chai;

describe('GET /matches', function () {
  afterEach( function() { sinon.restore()})

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
  it.only('Should update the in progress status', async function () {
    const testMatch = allMatches[41];

    sinon.stub(SequelizeMatch, 'findByPk').resolves(testMatch as any);

    const request = await chai.request(app).patch('/matches/42/finish');

    expect(request.status).to.be.equal(200);
    expect(request.body).to.be.deep.equal({ message: 'Finished'})
  });
});
