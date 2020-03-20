import chai from 'chai';
import chaiHttp from 'chai-http';
import { describe, it } from 'mocha';
import app from '../../app';
import testVoteData from '../mockData/testVoteData';

const { expect } = chai;
chai.use(chaiHttp);
describe('User vote', () => {
    it('Should not allow unauthenticated user to vote', (done) => {
        chai.request(app).post('/votes').set('Authorization', process.env.falseToken)
            .send(testVoteData[0])
            .end((err, res) => {
                expect(res).to.have.status(401);
                expect(res.body).to.have.property('error');
                expect(res.body.error).to.equal('You are not authorized to perform this task');
            }, done());
    });
});
