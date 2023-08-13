import { Schema, model } from 'mongoose';

const Post = new Schema({
    author: {type: Schema.Types.ObjectId, ref: 'User', required},
    title: {type: String, required},
    post: {type: String, required},
    published: {type: Boolean, default: false},
    featured: {type: Boolean, default: false}, // This is a manual selection for now, might add a view system and feature base off that.
    datePublished: {type: Date, default: Date.now()}
})

export default model('Post', Post);