import express from 'express'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import RecipeModel, { RecipeProps } from './models/Recipe.js'
import mongoose from 'mongoose'
import { flattenDiagnosticMessageText } from 'typescript'

const app = express()
dotenv.config()

mongoose.connect(`${process.env.DB}` || 'nodata')
	.then(()=>{console.log('data flow')})
	.catch((err)=>{console.error(err.message)})

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

const DATA = [
	{
		'name': 'pickle',
		'amount': 1000,
		'unit': 'log'
	},
	{
		'name': 'ground beef',
		'amount': 2,
		'unit': 'lbs'
	}
]

app.get('/', (req,res) => {
	res.status(200).send('hi')
})

const validateSlug = async (originalSlug: string, model:string) => {
	const data = await RecipeModel.find()
	const filteredData = data.filter((item) => {
		return String(item.slug) === originalSlug
	})

	if (filteredData.length > 0) {
		const newSlug = originalSlug + '-1'
		return `${newSlug}`
	}
}

app.post('/post', async (req,res) => {
	const { name, cat, ingredients } = req.body
	let data
	try {
		let slug = validateSlug(name.toLowerCase().replaceAll(' ','-'), 'recipe')
		data = await new RecipeModel(
			{
				name: name,
				slug: slug,
				cat: cat,
				ingredients: ingredients
			}
		)
		// data.save()
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
	res.status(201).json(data)
})

app.listen(process.env.PORT || 4000, () => {
	console.log('server running')
})
