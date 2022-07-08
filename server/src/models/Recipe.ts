import { Schema, model } from 'mongoose'

interface RecipeProps {
	name: string,
	slug?: string,
	cat?: [string],
	ingredients: [
		{
			name: string,
			amount?: number,
			unit?: string
		}
	]
}

const RecipeSchema = new Schema<RecipeProps>({
	name: {type: String, required: true},
	slug: {type: String, unique: true},
	cat: Array,
	ingredients: {type: Array, required: true}
},
{timestamps: true})

export default model('Recipe', RecipeSchema)