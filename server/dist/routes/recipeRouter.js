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
import RecipeModel from '../models/Recipe.js';
const router = express.Router();
const modelSelector = {
    recipe: () => __awaiter(void 0, void 0, void 0, function* () { return yield RecipeModel.find(); })
};
const validateSlug = (originalSlug, model) => __awaiter(void 0, void 0, void 0, function* () {
    originalSlug = originalSlug.toLowerCase().trim().split(' ').join('-');
    const data = yield modelSelector[model]();
    // get all that contain requested slug
    const filteredData = data.filter((item) => {
        return item.slug.includes(originalSlug);
    });
    if (filteredData.length > 0) {
        // check if the exact url slug is avaiable
        const checkForExact = filteredData.filter((item) => {
            return item.slug === originalSlug;
        });
        if (checkForExact.length === 0) {
            return originalSlug;
        }
        // filter out excess and return updated count
        const doubleFilteredData = [];
        const slugLength = originalSlug.split('-');
        filteredData.forEach((item, index) => {
            const validationArray = item.slug.split('-');
            if (validationArray.length - 1 === slugLength.length) {
                doubleFilteredData.push(filteredData[index]);
            }
        });
        const newSlug = `${originalSlug}-${doubleFilteredData.length}`;
        return `${newSlug}`;
    }
    else {
        // return original if no matches exist
        return originalSlug;
    }
});
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield RecipeModel.find();
    const ret = [];
    data.forEach((item) => {
        ret.push(item.slug);
    });
    res.status(200).send();
}));
router.post('/new', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, cat, ingredients } = req.body;
    let data;
    try {
        data = yield new RecipeModel({
            name: name,
            slug: yield validateSlug(name, 'recipe'),
            cat: cat,
            ingredients: ingredients
        });
        data.save();
        res.status(201).json(data);
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
}));
export default router;
