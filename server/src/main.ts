import express from 'express'

const app = express()

app.get('/', (req,res) => {
	res.status(200).json({
		'name': 'jake',
		'age': 37
	})
})

app.listen(process.env.PORT || 4200, () => {
	console.log('server running')
})
