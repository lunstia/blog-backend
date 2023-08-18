import { Router } from 'express';
import index from '../controllers/index.js';
const router = Router();

router.get('/featured')

router.post('/login', index.login_post);
router.post('/signup', index.signup_post);

export default router;