import { Schema, model } from 'mongoose';

const Comment = new Schema({
    post: {type: Schema.Types.ObjectId, ref: 'Post', required},
    user: {type: Schema.Types.ObjectId, ref: 'User', required},
    comment: {type: String, minLength: 1, required},
    date: {type: Date, default: Date.now()}
});

export default model('Comment', Comment);