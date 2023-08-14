import { Router } from 'express';
const router = Router();

router.get('/', (req, res) => {
    res.json({
        message: "Get Posts!"
    });
});

export default router;