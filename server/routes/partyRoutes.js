import express from 'express';
import PartyClass from '../controllers/partyController';
import checkParty from '../middleware/checkParty';
import checkAdmin from '../middleware/checkAdmin';
import checkToken from '../middleware/checkToken';

const router = express.Router();
const newclass = new PartyClass();
router.post('/parties', [checkParty, checkToken, checkAdmin], newclass.createParty);
router.get('/parties', [checkToken], newclass.getAllParties);
router.get('/parties/:partyId', [checkToken], newclass.getSpecificParty);
router.delete('/parties/:partyId', [checkToken, checkAdmin], newclass.deleteParty);
export default router;
