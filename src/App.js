import React, { Component } from 'react'
import axios from 'axios'
import LocationDisplay from './components/LocationDisplay';
import TemperatureDisplay from './components/TemperatureDisplay';
import DarkSkyAttribution from './components/DarkSkyAttribution';


class App extends Component {
	state = {
		currently: {},
		minutely: {},
		hourly: {},
		daily: {},
		temperatureInC: '',
		currentTime: '',
		currentLocation: ''
	}

	componentDidMount() {
		this.handleGetLocation()
			.then((position) => {
				this.handleGetWeather(position.coords)
			})
			.catch((error) => {
				console.log(error)
			})
	}

	// unix timestamp converter
	handleUnixToDay = (unix_timestamp) => {
		const date = new Date(unix_timestamp*1000)
		return date.toLocaleString()
	}
	// F to C converter
	handleFtoC = (f) => {
		const c = (f - 32) * 5/9
		return Math.round( c * 10 ) / 10 .toString()
	}
	// get location
	handleGetLocation = () => {
		return new Promise((resolve, reject) => {
			// success cb
			const success = (position) => {
				resolve(position)	
			}
			// error cb
			const error = (err) => {
				reject(alert(`ERROR(${err.code}): ${err.message}`))
			}
			// options obj
			const options = {
				enableHighAccuracy: true,
				timeout: 5000,
				maximumAge: 0
			}

			if(navigator.geolocation) {
				navigator
					.geolocation
					.getCurrentPosition(success, error, options)
			}	else {
				reject('Geolocation is NOT available')
			}

		})	
	}
	// request to get weather json data
	handleGetWeather = (coords) => {
		// concurrent get requests
		axios.all([
			axios.get(`http://localhost:3000/currently/${coords.latitude},${coords.longitude}`),
			axios.get(`http://localhost:3000/location/${coords.latitude},${coords.longitude}`)
		])
		.then(axios.spread((currently, location) => {
			// convert f to c
			const temperatureInC = this.handleFtoC(currently.data.currently.temperature)

			// convert unix timestamp to local time
			const currentTime = this.handleUnixToDay(currently.data.currently.time)

			// assign address to variable
			const currentLocation = location.data.results[0].formatted_address

			// set state
			this.setState({
				currently: currently.data.currently,
				minutely: currently.data.minutely,
				hourly: currently.data.hourly,
				daily: currently.data.daily,
				temperatureInC,
				currentTime,
				currentLocation
			})
		}))
		.catch((error) => {
			console.log(error)
		})
	}

	render() {
		// destructuring
		const { temperatureInC, currently, currentTime, currentLocation } = this.state

		return (
			<div className='background'>
				<div className="background-overlay"></div>
					<div className="container">
						<LocationDisplay 
							lastUpdated={currentTime} 
							currentLocation={currentLocation}
						/>
						<TemperatureDisplay 
							degree={ temperatureInC } 
							summary={ currently.summary }
						/>
						<DarkSkyAttribution />
					</div>
			</div>
		)
	}
}

export default App