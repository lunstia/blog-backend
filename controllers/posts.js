import asyncHandler from 'express-async-handler';
import User from '../models/User.js';
import Post from '../models/Post.js';
import Comment from '../models/Comment.js';
import verifyToken from '../utils/verifyToken.js';
import verifyAdmin from '../utils/verifyAdmin.js';
import {body, validationResult} from 'express-validator';
import {isValidObjectId} from 'mongoose';

const index = {};

index.post_Posts = [
    verifyToken,
    verifyAdmin,
    body("title")
        .trim()
        .exists()
        .escape(),
    body("post")
        .trim()
        .exists()
        .escape(),
    body("publish")
        .isBoolean()
        .optional()
        .escape(),
    body("feature")
        .isBoolean()
        .optional()
        .escape(),
    asyncHandler(async (req, res) => {
        res.json({
            message: "CREATE POST: NOT IMPLEMENTED YET"
        });
    })
]

index.get_Posts = asyncHandler(async (req, res) => {
    const posts = await Post.find({published: true}).sort({datePublished: -1}).limit(25);

    res.json({
        posts
    });
})

index.get_Posts_Comments = asyncHandler(async (req, res, next) => {
    if (!isValidObjectId(req.params.id)) {
        res.sendStatus(404);
        return;
    }

    const [post, comments] = await Promise.all([
        await Post.findById(req.params.id),
        await Comment.find({post: req.params.id}).sort({date: -1}).limit(25)
    ])

    if (post === null) {
        res.sendStatus(404);
        return;
    }

    if (post.published === false) {
        verifyToken(req, res, next);
        verifyAdmin(req, res, next);
    }

    res.json({post, comments}); // Comments can return as an empty array cause it's fine for it to be empty.
});

index.update_Post = asyncHandler(async (req, res) => {
    res.json({message: "Not implemented yet"});
});

index.delete_Post = asyncHandler(async (req, res) => {
    res.json({message: "Not implemented yet"});
});

index.post_Comment = asyncHandler(async (req, res) => {
    res.json({message: "Not implemented yet"});
});

index.update_Comment = asyncHandler(async (req, res) => {
    res.json({message: "Not implemented yet"});
});

index.delete_Comment = asyncHandler(async (req, res) => {
    res.json({message: "Not implemented yet"});
});


export default index