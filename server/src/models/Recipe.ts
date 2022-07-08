import mongoose from 'mongoose'

export interface IngredientProps {
	name: string,
	amount?: number,
	unit?: string
}

export interface RecipeProps {
	name: string,
	slug?: string,
	cat?: [string],
	ingredients: [{}]
}

const RecipeSchema = new mongoose.Schema<RecipeProps>(
	{
		name: {type: String, required: true},
		slug: {type: String, unique: true},
		cat: Array,
		ingredients: Array
	},
	{
		timestamps: true
	}
)

const RecipeModel = mongoose.model('Recipe', RecipeSchema)

export default RecipeModel