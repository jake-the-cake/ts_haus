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
import mongoose from 'mongoose';
const app = express();
dotenv.config();
mongoose.connect(`${process.env.DB}` || 'nodata')
    .then(() => { console.log('data flow'); })
    .catch((err) => { console.error(err.message); });
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
const validateSlug = (originalSlug, model) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield RecipeModel.find();
    const filteredData = data.filter((item) => {
        return String(item.slug) === originalSlug;
    });
    if (filteredData.length > 0) {
        const newSlug = originalSlug + '-1';
        return `${newSlug}`;
    }
});
app.post('/post', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, cat, ingredients } = req.body;
    let data;
    try {
        let slug = validateSlug(name.toLowerCase().replaceAll(' ', '-'), 'recipe');
        data = yield new RecipeModel({
            name: name,
            slug: slug,
            cat: cat,
            ingredients: ingredients
        });
        // data.save()
    }
    catch (err) {
        if (err instanceof Error) {
            res.status(401).json({
                message: err.message
            });
            return false;
        }
        else {
            res.status(500);
            console.log('Unexpected error', err);
            return false;
        }
    }
    res.status(201).json(data);
}));
app.listen(process.env.PORT || 4000, () => {
    console.log('server running');
});
