import { Router } from 'express';
import index from '../controllers/index.js';
const router = Router();

router.get('/featured', index.get_featured);
router.post('/login', index.post_login);
router.post('/signup', index.post_signup);

export default router;