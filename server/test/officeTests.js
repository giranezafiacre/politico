import chai from 'chai';
import chaiHttp from 'chai-http';
import { describe, it } from 'mocha';
import app from '../../app';
import testOfficeData from '../mockData/testOfficeData';

const { expect } = chai;
chai.use(chaiHttp);
describe('Admin create office', () => {
    it('Should allow Admin to create office', (done) => {
        chai.request(app).post('/offices').set('Authorization', process.env.userToken1)
            .send(testOfficeData[0])
            .end((err, res) => {
                expect(res).to.have.status(201);
                expect(res.body).to.have.property('message');
                expect(res.body).to.have.property('data');
                expect(res.body.data).to.have.property('id');
                expect(res.body.data).to.have.property('type');
                expect(res.body.data).to.have.property('name');
            }, done());
    });
    it('Should not allow Any user to create office', (done) => {
        chai.request(app).post('/offices').set('Authorization', process.env.userToken2)
            .send(testOfficeData[0])
            .end((err, res) => {
                expect(res).to.have.status(403);
                expect(res.body).to.have.property('error');
                expect(res.body.error).to.equal('you are not authorized to perform this task');
            }, done());
    });
});

describe('user get all offices', () => {
    it('Should allow user who provided token to see offices', (done) => {
        chai.request(app).get('/offices').set('Authorization', process.env.userToken2)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('data');
                expect(res.body.message).to.equal('Posts successfully retreived');
            }, done());
    });
});
