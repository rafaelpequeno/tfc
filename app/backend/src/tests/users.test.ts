import * as sinon from 'sinon';
import * as chai from 'chai';
import * as jwt from 'jsonwebtoken';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Example from '../database/models/ExampleModel';

import { Response } from 'superagent';
import SequelizeUser from '../database/models/SequelizeUser';
import * as bcrypt from 'bcryptjs'
import { userData } from './mocks/users.mock';
import { build } from 'joi';

chai.use(chaiHttp);


const { expect } = chai;

describe('POST /login', function () {
  afterEach(function () { sinon.restore() })

  // it('Should login successfully', async function () {
  //   const body = {
  //     email: 'user@user.com',
  //     password: 'secret_user',
  //   }

  //   sinon.stub(SequelizeUser, 'findOne').resolves(SequelizeUser.build(userData));

  //   const { status, body: { token } } = await chai.request(app).post('/login').send(body);

  //   expect(status).to.be.equal(200);
  //   expect(token).to.not.be.undefined;
  // });
  it(`Should not login successfully when body don't have a email`, async function () {
    const body = {
      password: 'secret_user',
    }

    sinon.stub(SequelizeUser, 'findOne').resolves(null);

    const request = await chai.request(app).post('/login').send(body);

    expect(request.status).to.be.equal(400);
    expect(request.body).to.be.deep.equal({ "message": "All fields must be filled" });
  });
  it(`Should not login successfully when body got a wrong email`, async function () {
    const body = {
      email: 'wrong@email.com',
      password: 'secret_user',
    }

    sinon.stub(SequelizeUser, 'findOne').resolves(SequelizeUser.build(userData));

    const request = await chai.request(app).post('/login').send(body);

    expect(request.status).to.be.equal(401);
    expect(request.body).to.be.deep.equal({ "message": "Invalid email or password" });
  });
  it(`Should not login successfully when body don't have a password`, async function () {
    const body = {
      email: 'user@user.com',
    }

    sinon.stub(SequelizeUser, 'findOne').resolves(SequelizeUser.build(userData));

    const request = await chai.request(app).post('/login').send(body);

    expect(request.status).to.be.equal(400);
    expect(request.body).to.be.deep.equal({ "message": "All fields must be filled" });
  });
  it(`Should not login successfully when body got a wrong password`, async function () {
    const body = {
      email: 'user@user.com',
      password: 'wrong_password',
    }

    sinon.stub(SequelizeUser, 'findOne').resolves(SequelizeUser.build(userData));

    const request = await chai.request(app).post('/login').send(body);

    expect(request.status).to.be.equal(401);
    expect(request.body).to.be.deep.equal({ "message": "Invalid email or password" });
  });
  describe('GET /login/role', function () {
    it('Should return a user role successfully', async function () {
      sinon.stub(SequelizeUser, 'findOne').resolves(SequelizeUser.build(userData));

      const token = jwt.sign({
        id: 1,
        }, process.env.JWT_SECRET || 'secret');        

      const request = await chai.request(app).get('/login/role').set('Authorization', `Bearer ${token}`);

      expect(request.status).to.be.equal(200);
      expect(request.body).to.be.deep.equal({ role: 'user' });
    });
    it('Should not return a user role when has no token', async function () {
      sinon.stub(SequelizeUser, 'findOne').resolves(null);

      const request = await chai.request(app).get('/login/role');

      expect(request.status).to.be.equal(401);
      expect(request.body).to.be.deep.equal({ "message": "Token not found" });
    });
    it('Should not return a user role when has a invalid token', async function () {
      sinon.stub(SequelizeUser, 'findOne').resolves(userData as any);

      const token = 'invalid_token';

      const request = await chai.request(app).get('/login/role').set('Authorization', `Bearer ${token}`);

      expect(request.status).to.be.equal(401);
      expect(request.body).to.be.deep.equal({ "message": "Token must be a valid token" });
    });
  });
});
