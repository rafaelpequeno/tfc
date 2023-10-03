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
});
