import asyncHandler from 'express-async-handler';
import User from '../models/User.js';
import Post from '../models/Post.js';
import Comment from '../models/Comment.js';
import verifyToken from '../utils/verifyToken.js';
import {body, validationResult} from 'express-validator';

const index = {};

index.Posts_post = [
    verifyToken, 
    (req, res) => {
        console.log(req.user);
        if (!req.user.isAdmin) {
            res.status(403).json({message: "User is unauthorized"});
            return
        } 
        res.json({
            message: "CREATE POST: NOT IMPLEMENTED YET"
        });
    }
]

export default index