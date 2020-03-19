import chai from 'chai';
import chaiHttp from 'chai-http';
import { describe, it } from 'mocha';

import app from '../../app';
import testAuthData from '../mockData/testAuthData';

const { expect } = chai;
chai.use(chaiHttp);
describe('User SignUp', () => {
    it('Should allow a user to signup', (done) => {
        chai.request(app).post('/auth/signup')
            .send(testAuthData[0])
            .end((err, res) => {
                expect(res).to.have.status(201);
                expect(res.body).to.have.property('message');
                expect(res.body).to.have.property('data');
                expect(res.body.data).to.have.property('firstName');
                expect(res.body.data).to.have.property('lastName');
                expect(res.body.data).to.have.property('email');
                expect(res.body.data).to.have.property('token');
                done();
            });
    });
    it('Should NOT allow a user to signup: Invalid data', (done) => {
        chai.request(app).post('/auth/signup')
            .send(testAuthData[1])
            .end((err, res) => {
                expect(res).to.have.status(400);
                expect(res.body).to.have.property('error');
                expect(res.body.error).to.equal(' nationalId  is not allowed to be empty');
                done();
            });
    });
    it('Should NOT allow a user to signup: user already exist', (done) => {
        chai.request(app).post('/auth/signup')
            .send(testAuthData[0])
            .end((err, res) => {
                expect(res).to.have.status(409);
                expect(res.body).to.have.property('error');
                expect(res.body.error).to.equal('user with 4567890123456123 already exists');
                done();
            });
    });
});
describe('User Signin', () => {
    it('Should allow a user to signin', (done) => {
        chai.request(app).post('/auth/signin')
            .send(testAuthData[2])
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('message');
                expect(res.body).to.have.property('data');
                expect(res.body.data).to.have.property('token');
                done();
            });
    });
    it('Should NOT allow a user to signin: Email not found or incorrect password', (done) => {
        chai.request(app).post('/auth/signin')
            .send(testAuthData[3])
            .end((err, res) => {
                expect(res).to.have.status(400);
                expect(res.body).to.have.property('error');
                expect(res.body.error).to.equal('Invalid email,nationalId or password');
                done();
            });
    });
    it('Should NOT allow a user to signin: Invalid input or missing input', (done) => {
        chai.request(app).post('/auth/signin')
            .send(testAuthData[5])
            .end((err, res) => {
                expect(res).to.have.status(400);
                expect(res.body).to.have.property('error');
                expect(res.body.error).to.equal(' password  is not allowed to be empty');
                done();
            });
    });
});
