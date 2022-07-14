var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import express from 'express';
import RecipeModel from '../models/Recipe.js';
import { formatTitle } from '../utils/format/formatTitle.js';
import { parseCategoryList } from '../utils/parse/parseCategoryList.js';
import { parseRecipeComponents } from '../utils/parse/parseRecipeComponents.js';
import { validateSlug } from '../utils/validation/validateSlug.js';
const router = express.Router();
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield RecipeModel.find();
    const ret = [];
    data.forEach((item) => {
        ret.push(item.slug);
    });
    res.status(200).json(ret);
}));
router.post('/new', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let _a = req.body, { name, cat } = _a, data = __rest(_a, ["name", "cat"]);
    // sort out ingredients and directions
    const { comps, steps } = parseRecipeComponents(data);
    // check for blank name
    if (name === '') {
        name = 'Untitled';
    }
    try {
        const data = yield new RecipeModel({
            name: formatTitle(name),
            slug: yield validateSlug(name, 'recipe'),
            cat: parseCategoryList(cat),
            comps: comps,
            steps: steps,
            author: 'Chef Jake',
            private: true
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
