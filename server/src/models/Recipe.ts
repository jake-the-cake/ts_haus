import mongoose from 'mongoose'

export interface IngredientProps {
	name: string,
	amount?: number,
	unit?: string
}

export interface RecipeProps {
	name: string,
	slug: string,
	cat: string[],
	comps: object[],
	steps: string[],
	author: string,
	credit: string,
	private: boolean
}

const RecipeSchema = new mongoose.Schema<RecipeProps>(
	{
		name: {type: String, required: true},
		slug: {type: String, unique: true, required: true},
		cat: Array,
		comps: Array,
		steps: Array,
		author: {type: String, required: true},
		credit: String,
		private: {type: Boolean, default: false}
	},
	{
		timestamps: true
	}
)

const RecipeModel = mongoose.model('Recipe', RecipeSchema)

export default RecipeModel