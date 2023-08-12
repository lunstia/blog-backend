import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors());

app.get('/', (req, res) => {
    res.json({
        message: "Hello, World!"
    });
})

app.listen(process.env.PORT, () => console.log("Listening on " + process.env.PORT))