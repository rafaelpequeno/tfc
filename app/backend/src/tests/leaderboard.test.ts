import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

// import { allMatches } from './mocks/matches.mock';
// import SequelizeMatch from '../database/models/SequelizeMatch';
// import SequelizeUser from '../database/models/SequelizeUser';
// import { userData } from './mocks/users.mock';

// import * as jwt from 'jsonwebtoken';

chai.use(chaiHttp);


const { expect } = chai;

describe('GET /matches', function () {
  afterEach(function () { sinon.restore() })

  it('Should return all home teams stats', async function () {
    const request = await chai.request(app).get('/leaderboard/home');

    expect(request.status).to.be.equal(200);
  });
});
