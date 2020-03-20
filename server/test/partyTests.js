import chai from 'chai';
import chaiHttp from 'chai-http';
import { describe, it } from 'mocha';
import app from '../../app';
import testPartyData from '../mockData/testPartyData';

const { expect } = chai;
chai.use(chaiHttp);
describe('Admin create Party', () => {
    it('Should not allow unauthenticated user to create party', (done) => {
        chai.request(app).post('/parties').set('Authorization', process.env.userToken2)
            .send(testPartyData[0])
            .end((err, res) => {
                expect(res).to.have.status(403);
                expect(res.body).to.have.property('error');
                expect(res.body.error).to.equal('You are not authorized to perform this task');
            }, done());
    });
});
