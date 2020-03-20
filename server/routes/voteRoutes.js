import express from 'express';
import VoteClass from '../Controllers/voteController';
import checkToken from '../middleware/checkToken';
import checkVote from '../middleware/checkVote';


const router = express.Router();
const newclass = new VoteClass();
router.post('/votes', [checkToken, checkVote], newclass.createVote);
export default router;
