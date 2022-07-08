var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import RecipeModel from './models/Recipe.js';
const app = express();
dotenv.config();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const DATA = [
    {
        'name': 'pickle',
        'amount': 1000,
        'unit': 'log'
    },
    {
        'name': 'ground beef',
        'amount': 2,
        'unit': 'lbs'
    }
];
app.get('/', (req, res) => {
    res.status(200).send('hi');
});
app.post('/post', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield new RecipeModel(req.body);
    // req.body
    res.status(201).json(data);
    console.log('sent');
    console.log(data);
}));
app.listen(process.env.PORT || 4000, () => {
    console.log('server running');
});
