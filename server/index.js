const path = require('path')
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
const axios = require('axios')

const { darkSkyKey, googleMapsKey } = require('../config/keys')

const googleMapsClient = require('@google/maps').createClient({
	key: googleMapsKey,
	Promise: Promise
});

const whitelist = ['http://localhost:8080']
const options = {
	origin: whitelist,
	optionsSuccessStatus: 200
}

// app.use(express.static(path.join(__dirname, '../public')))
app.use(cors(options))
app.use(morgan('tiny'))

// app.get('*', (req, res) => {
// 	res.sendFile(path.join(__dirname, '../public/index.html'))
// })

app.get('/currently/:latitude,:longitude', (req, res) => {
	const latitude = req.params.latitude
	const longitude = req.params.longitude

	axios
		.get(`https://api.darksky.net/forecast/${darkSkyKey}/${latitude},${longitude}`)
		.then((response) => {
			console.log(response.data)
			res.status(200).json(response.data)
		})
		.catch((error) => {
			console.log(error)
		})
})

app.get('/location/:latitude,:longitude', (req, res) => {
	const latitude = req.params.latitude
	const longitude = req.params.longitude

	googleMapsClient
		.reverseGeocode({
			latlng: [latitude, longitude]
		})
		.asPromise()
		.then((response) => {
			console.log(response)
			res.status(200).json(response.json)
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