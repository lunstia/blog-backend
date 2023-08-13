import { Schema, model } from 'mongoose';

const User = new Schema({
    username: {type: String, required},
    password: {type: String, required},
    isAdmin: {type: Boolean, default: false}
});

export default model('User', User);