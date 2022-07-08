import mongoose from 'mongoose';
const RecipeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    slug: { type: String, unique: true },
    cat: Array,
    ingredients: Array
}, {
    timestamps: true
});
const RecipeModel = mongoose.model('Recipe', RecipeSchema);
export default RecipeModel;
