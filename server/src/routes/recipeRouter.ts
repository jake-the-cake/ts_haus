import express from 'express'
import RecipeModel from '../models/Recipe.js'

const router = express.Router()

const modelSelector: any = {
	recipe: async () => {return await RecipeModel.find()}
}

interface ValidateSlugProps {
	(
		originalSlug: string,
		model: any
	): Promise<string>
}

interface SlugProps {
	slug: string
}

const validateSlug:ValidateSlugProps = async (originalSlug, model) => {
	originalSlug = originalSlug.toLowerCase().trim().split(' ').join('-')
	const data: [] = await modelSelector[model]()

	// get all that contain requested slug
	const filteredData: [] | never[] = data.filter((item:SlugProps) => {
		return item.slug.includes(originalSlug)
	})

	if (filteredData.length > 0) {
		// check if the exact url slug is avaiable
		const checkForExact = filteredData.filter((item:SlugProps) => {
			return item.slug === originalSlug
		})
		if (checkForExact.length === 0) {
			return originalSlug
		}
		
		// filter out excess and return updated count
		const doubleFilteredData: [] = []
		const slugLength: string[] = originalSlug.split('-')
		filteredData.forEach((item:SlugProps, index) => {
			const validationArray = item.slug.split('-')
			if (validationArray.length - 1 === slugLength.length) {
				doubleFilteredData.push(filteredData[index])
			}
		})
		const newSlug: string = `${originalSlug}-${doubleFilteredData.length}`
		return `${newSlug}`
	}
	else {
		// return original if no matches exist
		return originalSlug
	}
}

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
	let data
	try {
		data = await new RecipeModel(
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