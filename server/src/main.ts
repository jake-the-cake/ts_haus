import express from 'express'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import RecipeModel, { RecipeProps } from './models/Recipe.js'
import mongoose from 'mongoose'
import recipeRouter from './routes/recipeRouter.js'

const app = express()
dotenv.config()

mongoose.connect(`${process.env.DB}` || 'nodata')
	.then(()=>{console.log('data flow')})
	.catch((err)=>{console.error(err.message)})

app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use('/cookbook', recipeRouter)

app.get('/', (req,res) => {
	res.status(200).send('hi')
})

app.listen(process.env.PORT || 4000, () => {
	console.log('server running')
})