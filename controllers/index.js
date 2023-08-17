import bcrypt from 'bcrypt';
import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import {body, validationResult} from 'express-validator';

const index = {}

index.login_post = asyncHandler( async (req, res) => {
    const userPassword = req.body.password;
    const userName = req.body.username;

    if (!userName || !userPassword) {
        res.sendStatus(400);
        return
    }

    const user = await User.findOne({username: userName}).collation( { locale: 'en_US', strength: 1 } )
    const storedPassword = user.password || "password"
    const match = await bcrypt.compare(userPassword, storedPassword);
    if (!user || !match) {
        res.status(401).json({message: "Invalid username or password"});
        return
    }

    const token = await jwt.sign({user: {_id: user._id, username: user.username, isAdmin: user.isAdmin}}, process.env.SECRET_KEY)
    res.json({message: "Login successful", token});
})

index.signup_post = [
    body('username', "Username cannot be empty")
        .trim()
        .exists()
        .isLength({min: 1, max: 20})
        .withMessage('Username must atleast be 1 character and under or equal to 20 characters')
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
            res.status(400).json({message: result.errors[0].msg})
            return
        } else {
            
            const hash = await bcrypt.hash(req.body.password, 10)
            const user = new User({username: req.body.username, password: hash})
            await user.save()

            const token = await jwt.sign({user: {_id: user._id, username: user.username, isAdmin: user.isAdmin}}, process.env.SECRET_KEY)
            res.json({message: "Signup successful!", token});
        }
    })
]

export default index