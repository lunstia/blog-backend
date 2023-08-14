import { Router } from 'express';
const router = Router();

router.get('/', (req, res) => {
    res.json({
        message: "Get Posts!"
    });
});

router.get('/:id', (req, res) => {
    // get post and comments
});


router.post('/', (req, res) => {
    // Make sure to verify jwt token
    // Posts a post
    res.json({
        message: "Not implemented yet"
    });
});

router.post('/:id', (req, res) => {
    // post a comment
})

router.update('/:id', (req, res) => {
    // update a post
})

router.update('/:id/:comment_id', (req, res) => {
    // updates a comment
})

router.delete('/:id', (req, res) => {
    // deletes a post
});

router.delete('/:id/:comment_id', (req, res) => {
    // deletes a comment
});




export default router;