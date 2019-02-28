const express = require('express')
const app = express()
const axios = require('axios')
const { darkSkyKey } = require('../keys/apikey')

const url = 'https://api.darksky.net/forecast/0123456789abcdef9876543210fedcba/42.3601,-71.0589'
app.get('/', (req, res) => {
	axios
		.get(`https://api.darksky.net/forecast/${darkSkyKey}/42.3601,-71.0589`)
		.then((response) => {
			console.log(response.data.currently)
			res.json(response.data.currently)
		})
		.catch((error) => {
			console.log(error)
		})
})

// init server
const port = 3000 || process.env.PORT
app.listen(port, () => {
	console.log(`server started on localhost:${port}`)
})