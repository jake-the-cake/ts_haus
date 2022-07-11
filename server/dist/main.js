import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import recipeRouter from './routes/recipeRouter.js';
const app = express();
dotenv.config();
mongoose.connect(`${process.env.DB}` || 'nodata')
    .then(() => { console.log('data flow'); })
    .catch((err) => { console.error(err.message); });
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/cookbook', recipeRouter);
app.get('/', (req, res) => {
    res.status(200).send('hi');
});
app.listen(process.env.PORT || 4000, () => {
    console.log('server running');
});
