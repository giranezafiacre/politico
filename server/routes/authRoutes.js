import express from 'express';
import UserClass from '../controllers/AuthControllers';
import checkUser from '../middleware/checkUser';
import checkLogIn from '../middleware/checkLogIn';


const router = express.Router();
const newclass = new UserClass();
router.post('/auth/signup', [checkUser], newclass.createUser);
router.post('/auth/signin', [checkLogIn], newclass.login);
export default router;
