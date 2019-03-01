const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
const axios = require('axios')
const { darkSkyKey } = require('../keys/apikey')

const whitelist = ['http://localhost:8080']
const options = {
	origin: whitelist[0],
	optionsSuccessStatus: 200
}

app.use(cors(options))
app.use(morgan('tiny'))

const url = 'https://api.darksky.net/forecast/0123456789abcdef9876543210fedcba/42.3601,-71.0589'
app.get('/weather', (req, res) => {
	axios
		.get(`https://api.darksky.net/forecast/${darkSkyKey}/42.3601,-71.0589`)
		.then((response) => {
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