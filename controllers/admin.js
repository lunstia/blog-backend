import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import Post from '../models/Post.js';
import Comment from '../models/Comment.js';
import {body, validationResult} from 'express-validator';

const admin = {}


export default admin;