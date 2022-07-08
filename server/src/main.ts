import express from 'express'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import RecipeModel from './models/Recipe.js'

const app = express()
dotenv.config()

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

app.post('/post', async (req,res) => {
	const data = await new RecipeModel(req.body)
	// req.body
	res.status(201).json(data)
	console.log('sent')
	console.log(data)
})

app.listen(process.env.PORT || 4000, () => {
	console.log('server running')
})
