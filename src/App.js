import React, { Component } from 'react'
import { handleFtoC, handleUnixToDay, handleUnixToHours } from './util/utilities'
import axios from 'axios'
import LocationDisplay from './components/LocationDisplay';
import CurrentlyDisplay from './components/CurrentlyDisplay';
import DarkSkyAttribution from './components/DarkSkyAttribution';
import NextTwentyFour from './components/NextTwentyFour';


class App extends Component {
	state = {
		// fetched data
		currently: {},
		minutely: {},
		hourly: {},
		daily: {},

		// modified data
		// current
		currentTemperatureInC: '',
		currentTime: '',
		currentLocation: '',
		// hour
		hours: []
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

	componentDidUpdate(_, prevState) {
		if(this.state.hourly !== prevState.hourly) {
			const { hourly } = this.state
			const hours = []

			// 1. loop through hourly.data.temperature
			hourly.data.slice(0, 24).forEach((hour, idx) => {
				// 2.	convert temperature to C
				const tempInC = handleFtoC(hour.temperature)
				// 3. convert unix time
				const currentTime = handleUnixToHours(hour.time)
				// 4. put in obj
				const obj = {
					tempInC,
					currentTime
				}
				// 5. push into hours array
				hours.push(obj)
			})
			// 6. set state
			this.setState({
				hours
			})
		} else {
			console.log('false')
		}
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
			const currentTemperatureInC = handleFtoC(currently.data.currently.temperature)

			// convert unix timestamp to local time
			const currentTime = handleUnixToDay(currently.data.currently.time)

			// assign address to variable
			const currentLocation = location.data.results[0].formatted_address

			// set state
			this.setState({
				currently: currently.data.currently,
				minutely: currently.data.minutely,
				hourly: currently.data.hourly,
				daily: currently.data.daily,
				currentTemperatureInC,
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
		const { currentTemperatureInC, currently, currentTime, currentLocation, hours } = this.state

		// convert feelslike temp
		const feelsLike = handleFtoC(currently.apparentTemperature)

		return (
			<div className='background'>
				<div className="background-overlay"></div>
					<div className="container">
						<LocationDisplay 
							lastUpdated={currentTime} 
							currentLocation={currentLocation}
						/>
						<CurrentlyDisplay 
							degree={ currentTemperatureInC } 
							summary={ currently.summary }
							feelsLike={ Number.isNaN(feelsLike) ? '' : feelsLike }
						/>
						<NextTwentyFour 
							hours={ hours }
						/>

						<DarkSkyAttribution />
					</div>
			</div>
		)
	}
}

export default App