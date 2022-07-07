import express from 'express'
import dotenv from 'dotenv'

const app = express()

app.use(dotenv.config)

app.get('/', (req,res) => {
	res.status(200).json({
		'name': 'jake',
		'age': 37
	})
})

app.listen(process.env.PORT || 4000, () => {
	console.log('server running')
})
