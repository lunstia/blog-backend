import bcrypt from 'bcrypt';
import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import Post from '../models/Post.js';
import Comment from '../models/Comment.js';
import {body, validationResult} from 'express-validator';

const index = {}

index.get_featured = asyncHandler( async (req, res) => {
    const featuredPosts = await Post.find({featured: true, published: true}).sort({datePublished: -1})

    res.json({posts: featuredPosts});
})

index.post_login = [
    body("username", "Username cannot be empty")
        .trim()
        .exists()
        .isLength({min: 1, max: 20})
        .withMessage("Username cannot be over 20 characters")
        .escape(),
    body("password", "Password cannot be empty")
        .trim()
        .exists()
        .escape(),
    asyncHandler( async (req, res) => {
        const result = validationResult(req);
        if (!result.isEmpty()) {
            res.status(400).json({errors: result.errors});
            return;
        }
        
        const user = await User.findOne({username: req.body.username}).collation( { locale: 'en_US', strength: 1 } );
        const storedPassword = user.password;
        const match = await bcrypt.compare(req.body.password, storedPassword);
        if (!user || !match) {
            res.status(401).json({message: "Invalid username or password"});
            return;
        }

        const token = await jwt.sign({user: {_id: user._id, username: user.username, isAdmin: user.isAdmin}}, process.env.SECRET_KEY, {expiresIn: '3h'})
        res.json({message: "Login successful", token});

    })
];
index.post_signup = [
    body('username', "Username cannot be empty")
        .trim()
        .exists()
        .isLength({min: 1, max: 20})
        .withMessage('Username must be under or equal to 20 characters')
        .custom(value => !/\s/.test(value))
        .withMessage("Username cannot contain any spaces")
        .custom(async value => {
            const user = await User.findOne({username: value}).collation( { locale: 'en_US', strength: 1 } );
            if (user) {
                throw new Error('Username is already in use');
            }
        })
        .escape(),
    body('password', "Password cannot be empty")
        .trim()
        .exists()
        .isLength({ min: 8 })
        .withMessage("Password must be at least 8 characters")
        .escape(),
    body('passwordConfirmation', "Passwords doesnt match")
        .trim()
        .custom((value, { req }) => {
            return value === req.body.password;
        })
        .escape(),
    asyncHandler(async (req, res, next) => {
        const result = validationResult(req);
        if (!result.isEmpty()) {
            res.status(400).json({errors: result.errors})
            return
        } else {
            
            const hash = await bcrypt.hash(req.body.password, 10)
            const user = new User({username: req.body.username, password: hash})
            await user.save()

            const token = await jwt.sign({user: {_id: user._id, username: user.username, isAdmin: user.isAdmin}}, process.env.SECRET_KEY, {expiresIn: '3h'})
            res.json({message: "Signup successful", token});
        }
    })
]

export default index