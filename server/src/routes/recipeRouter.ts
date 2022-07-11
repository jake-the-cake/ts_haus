import express from 'express'
import RecipeModel from '../models/Recipe.js'
import { formatTitle } from '../utils/format/formatTitle.js'
import { parseCategoryList } from '../utils/parse/parseCategoryList.js'
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
	let { name, cat, comps, steps } = req.body
	
	// check for blank name
	if (name === '') { name = 'Untitled' }

	try {
		const data = await new RecipeModel(
			{
				name: formatTitle(name),
				slug: await validateSlug(name, 'recipe'),
				cat: parseCategoryList(cat),
				comps: comps,
				steps: steps
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