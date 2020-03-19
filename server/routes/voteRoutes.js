import express from 'express';
import VoteClass from '../controllers/voteController';
import checkToken from '../middleware/checkToken';
import checkVote from '../middleware/checkVote';


const router = express.Router();
const newclass = new VoteClass();
router.post('/votes', [checkVote, checkToken], newclass.createVote);

export default router;
