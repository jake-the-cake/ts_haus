import mongoose from 'mongoose';
const RecipeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    slug: { type: String, unique: true, required: true },
    cat: Array,
    comps: Array,
    steps: Array,
    author: { type: String, required: true },
    credit: String,
    private: { type: Boolean, default: false }
}, {
    timestamps: true
});
const RecipeModel = mongoose.model('Recipe', RecipeSchema);
export default RecipeModel;
