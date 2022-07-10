import express from 'express'
import RecipeModel from '../models/Recipe.js'
import { validateSlug } from '../utils/validation/validateSlug.js'

const router = express.Router()

router.get('/', async (req,res) => {
	const data = await RecipeModel.find()
	const ret = []
	data.forEach((item) => {
		ret.push(item.slug)
	})
	res.status(200).send()
})

router.post('/new', async (req,res) => {
	const { name, cat, ingredients } = req.body
	try {
		const data = await new RecipeModel(
			{
				name: name,
				slug: await validateSlug(name, 'recipe'),
				cat: cat,
				ingredients: ingredients
			}
		)
		data.save()
		res.status(201).json(data)
	}
	catch (err) {
		if (err instanceof Error) {
			res.status(401).json(
				{
					message: err.message
				}
			)
			return false
		}
		else {
			res.status(500)
			console.log('Unexpected error', err)
			return false
		}
	}
})

export default router