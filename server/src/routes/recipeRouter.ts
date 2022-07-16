import express from 'express'
import RecipeModel from '../models/Recipe.js'
import { formatTitle } from '../utils/format/formatTitle.js'
import { parseCategoryList } from '../utils/parse/parseCategoryList.js'
import { parseRecipeComponents } from '../utils/parse/parseRecipeComponents.js'
import { validateSlug } from '../utils/validation/validateSlug.js'

const router = express.Router()

const parseAuthorSlug: (name:string)=>string = (name) => {
	if (typeof name === 'string') {
		name = name.toLowerCase().split(' ').join('-')
	}
	return name
}

router.get('/', async (req,res) => {
	const data = await RecipeModel.find()
	const ret: object[] = []
	data.forEach((item: {}) => {
		ret.push(item)
	})
	res.status(200).json(ret)
})

router.get('/user/:user', async (req,res) => {
	const data = await RecipeModel.find()
	const user = req.params.user.replace('}','')
	const filteredData = data.filter(({author}) => parseAuthorSlug(author) === user)
	res.status(200).json(filteredData)
})

router.get('/recipe/:slug', async (req,res) => {
	const slug = req.params.slug.replace('}','')
	try {
		const data = await RecipeModel.where({slug: slug})
		res.status(200).json(data)
	}
	catch (err: any) {
		console.log(err.message)
	}
})

router.post('/new', async (req,res) => {
	let { name, cat, ...data } = req.body
	
	// sort out ingredients and directions
	const { comps, steps } = parseRecipeComponents(data)

	// check for blank name
	if (name === '') { name = 'Untitled' }

	try {
		const data = await new RecipeModel(
			{
				name: formatTitle(name),
				slug: await validateSlug(name, 'recipe'),
				cat: parseCategoryList(cat),
				comps: comps,
				steps: steps,
				author: 'Chef Jake',
				private: true
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