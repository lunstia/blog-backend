import { Router } from 'express';
import postController from '../controllers/posts.js';

const router = Router();

router.get('/', postController.get_Posts);

router.post('/', postController.post_Posts);

router.put('/:id', postController.update_Post);

router.delete('/:id', postController.delete_Post);

router.get('/:id', postController.get_Posts_Comments);

router.post('/:id', postController.post_Comment);

router.put('/:id/:comment_id', postController.update_Comment);

router.delete('/:id/:comment_id', postController.delete_Comment);

export default router;