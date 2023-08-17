import { Schema, model } from 'mongoose';

const Post = new Schema({
    author: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    title: {type: String, required: true},
    post: {type: String, required: true},
    published: {type: Boolean, default: false},
    featured: {type: Boolean, default: false}, // This is a manual selection for now, might add a view system and feature base off that.
    datePublished: {type: Date, default: Date.now()}
})

export default model('Post', Post);