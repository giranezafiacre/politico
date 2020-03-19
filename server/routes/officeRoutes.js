import express from 'express';
import OfficeClass from '../controllers/officeController';
import checkOffice from '../middleware/checkOffice';
import checkAdmin from '../middleware/checkAdmin';
import checkToken from '../middleware/checkToken';
import checkCandidate from '../middleware/checkCandidate';

const router = express.Router();
const newclass = new OfficeClass();
router.post('/offices', [checkOffice, checkToken, checkAdmin], newclass.createOffice);
router.get('/offices', [checkToken], newclass.getAllOffices);
router.get('/offices/:officeId', [checkToken], newclass.getSpecificOffice);
router.post('/offices/:officeId/register', [checkCandidate, checkToken], newclass.createCandidate);
router.get('/offices/:officeId/result', [checkToken], newclass.getResult);
export default router;
