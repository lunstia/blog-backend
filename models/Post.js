import { Schema, model } from 'mongoose';

const Post = new Schema({
    author: {type: Schema.Types.ObjectId, ref: 'User', required},
    title: {type: String, required},
    post: {type: String, required},
    published: {type: Boolean, default: false},
    datePublished: {type: Date, default: Date.now()}
})

export default model('Post', Post);