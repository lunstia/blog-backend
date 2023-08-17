import { Schema, model } from 'mongoose';

const User = new Schema({
    username: {type: String, minLength: 1, maxLength: 20, required: true, index: {collation: {locale: 'en_US', strength: 1}}},
    password: {type: String, minLength: 8, maxLength: 64, required: true},
    isAdmin: {type: Boolean, default: false}
});

export default model('User', User);