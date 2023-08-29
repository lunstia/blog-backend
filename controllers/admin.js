import asyncHandler from 'express-async-handler';
import User from '../models/User.js';
import Post from '../models/Post.js';
import Comment from '../models/Comment.js';
import verifyToken from '../utils/verifyToken.js';
import verifyAdmin from '../utils/verifyAdmin.js';
import {body, validationResult} from 'express-validator';
import {isValidObjectId} from 'mongoose';

const admin = {} // This mainly handles getting data that regular users shouldnt access and that's why posts route will also have some admin duties in there.

admin.get_Posts = [
    verifyToken,
    verifyAdmin,
    asyncHandler(async (req, res) => {
        const posts = await Post.find({}, "title author datePublished featured").sort({datePublished: -1}).limit(25);

        res.json({
            posts
        });
    })
]


export default admin;