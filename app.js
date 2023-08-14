import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import index from './routes/index.js';
import posts from './routes/posts.js';

mongoose.connect(process.env.MONGO_URI, { useUnifiedTopology: true, useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "mongo connection error"));

const app = express();

app.use(cors());

app.use('/', index);
app.use('/posts', posts);

app.listen(process.env.PORT, () => console.log("Listening on " + process.env.PORT))