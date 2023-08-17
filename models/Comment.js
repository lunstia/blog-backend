import { Schema, model } from 'mongoose';

const Comment = new Schema({
    post: {type: Schema.Types.ObjectId, ref: 'Post', required: true},
    user: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    comment: {type: String, minLength: 1, required: true},
    date: {type: Date, default: Date.now()}
});

export default model('Comment', Comment);