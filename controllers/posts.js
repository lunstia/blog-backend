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
    body("title", "Title cannot be empty")
        .trim()
        .notEmpty()
        .escape(),
    body("post", "Post cannot be empty")
        .trim()
        .notEmpty()
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
        const result = validationResult(req)
        if (!result.isEmpty()) {   
            res.status(400).json({errors: result.errors});
            return;
        }

        const post = new Post({
            author: req.user._id,
            title: req.body.title,
            post: req.body.post,
            published: req.body.publish,
            featured: req.body.feature
        });

        await post.save();
        res.json({postId: post._id});
    })
]

index.get_Posts = asyncHandler(async (req, res) => {
    const posts = await Post.find({published: true}).sort({datePublished: -1}).limit(25);

    res.json({
        posts
    });
})

index.get_Posts_Comments = [

    asyncHandler(async (req, res, next) => {
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
            req.post = post;
            req.comments = comments;
            next();
            return;
        }

        res.json({post, comments});
    }),
    verifyToken,
    verifyAdmin,
    asyncHandler(async (req, res) => {
        res.json({post: req.post, comments: req.comments}); // not sure if this is how you should do it
    })
];

index.update_Post = [ // Might separate higher priviledges in the future,
    verifyToken,      // so an admin can do anything but a poster cant update others or delete others etc, but for now heres limitations.
    verifyAdmin,
    body("title", "Title cannot be empty")
        .trim()
        .notEmpty()
        .escape(),
    body("post", "Post cannot be empty")
        .trim()
        .notEmpty()
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
        if (!isValidObjectId(req.params.id)) {
            res.sendStatus(404);
            return;
        }

        const result = validationResult(req)
        if (!result.isEmpty()) {
            res.status(400).json({errors: result.errors});
            return;
        }
        
        const post = await Post.findById(req.params.id);

        if (post === null) {
            res.status(404).json({error: "Post was not found"});
            return
        }

        if (!post.author.equals(req.user._id)) {
            res.status(403).json({error: "Only the author can update their own posts"});
            return
        }

        let newPost;

        if (post.published === false && req.body.publish === true) {
            newPost = new Post({
                _id: req.params.id,
                title: req.body.title,
                post: req.body.post,
                published: req.body.publish,
                featured: req.body.feature,
                datePublished: Date.now(),
            });
        } else {
            newPost = new Post({
                _id: req.params.id,
                title: req.body.title,
                post: req.body.post,
                published: req.body.publish,
                featured: req.body.feature,
                datePublished: post.datePublished,
            });
        }

        await Post.updateOne(post, newPost);
        res.json({postId: req.params.id});
    })
]

index.delete_Post = [
    verifyToken, 
    verifyAdmin,// Any admin can delete
    asyncHandler(async (req, res) => {
        if (!isValidObjectId(req.params.id)) {
            res.sendStatus(404);
            return;
        }

        await Post.findByIdAndDelete(req.params.id);
        res.sendStatus(200);
    })
];
index.post_Comment = [
    verifyToken,
    body("comment", "Comment cannot be empty")
        .trim()
        .notEmpty()
        .isLength({max: 1000})
        .withMessage("Comment must be under 1000 characters")
        .escape(),
    asyncHandler(async (req, res) => {
        if (!isValidObjectId(req.params.id)) {
            res.sendStatus(404);
            return;
        }

        const post = await Post.findById(req.params.id);

        if (post === null) {
            res.sendStatus(404);
            return;
        }

        const comment = new Comment({
            user: req.user._id,
            post: req.params.id,
            comment: req.body.comment
        })

        await comment.save();
        res.sendStatus(200);
    })
]

index.update_Comment = asyncHandler(async (req, res) => {
    res.json({message: "Not implemented yet"});
});

index.delete_Comment = asyncHandler(async (req, res) => {
    res.json({message: "Not implemented yet"});
});


export default index