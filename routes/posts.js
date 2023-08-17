import { Router } from 'express';
import verifyToken from '../utils/verifyToken.js';
const router = Router();

router.get('/', (req, res) => {
    res.json({
        message: "Get Posts!"
    });
});

router.get('/:id', (req, res) => {
    // get post and comments
});


router.post('/', verifyToken, (req, res) => {
    if (!req.user.isAdmin) {
        res.status(403).json({message: "User is unauthorized"});
        return
    } 
    res.json({
        message: "CREATE POST: NOT IMPLEMENTED YET"
    });
});

router.post('/:id', (req, res) => {
    // post a comment
})

router.put('/:id', (req, res) => {
    // update a post
})

router.put('/:id/:comment_id', (req, res) => {
    // updates a comment
})

router.delete('/:id', (req, res) => {
    // deletes a post
});

router.delete('/:id/:comment_id', (req, res) => {
    // deletes a comment
});




export default router;