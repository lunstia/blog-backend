import { Router } from 'express';
import postController from '../controllers/posts.js';
import Post from '../models/Post.js';
import Comment from '../models/Comment.js';
import {isValidObjectId} from 'mongoose';

const router = Router();

router.get('/', postController.get_Posts);

router.post('/', postController.post_Posts);

router.put('/:id', (req, res) => {
    // update a post
})

router.delete('/:id', (req, res) => {
    // deletes a post
});

router.get('/:id', postController.get_Posts_Comments);

router.post('/:id', (req, res) => {
    // post a comment
})

router.put('/:id/:comment_id', (req, res) => {
    // updates a comment
})

router.delete('/:id/:comment_id', (req, res) => {
    // deletes a comment
});




export default router;