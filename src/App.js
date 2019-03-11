import React, { Component } from 'react'
import { handleFtoC, handleUnixToDay, handleUnixToHours } from './util/utilities'
import axios from 'axios'
import LocationDisplay from './components/LocationDisplay';
import CurrentlyDisplay from './components/CurrentlyDisplay';
import DarkSkyAttribution from './components/DarkSkyAttribution';
import NextTwentyFour from './components/NextTwentyFour';

// import all images in ./img
// const importAll = (r) => {
// 	let images = {}
// 	r.keys().forEach((image, index) => {
// 		images[image.replace('./', '').replace('.jpg', '')] = r(image)
// 	})
// 	return images
// }

// const images = importAll(require.context('./img', false, /\.(jpg|png)$/))


class App extends Component {
	state = {
		loading: true,

		// images 
		images: {},

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
		currentIcon: '',
		// hour
		hours: []
	}

	componentDidMount() {
		const images = this.importAll(require.context('./img', false, /\.(jpg|png)$/))

		this.setState({
			images
		})

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

	importAll = (r) => {
		let images = {}
		r.keys().forEach((image, index) => {
			images[image.replace('./', '').replace('.jpg', '')] = r(image)
		})
		return images
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
				loading: !this.state.loading,
				currently: currently.data.currently,
				minutely: currently.data.minutely,
				hourly: currently.data.hourly,
				daily: currently.data.daily,
				currentIcon: currently.data.currently.icon,
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
		const { currentIcon, currentTemperatureInC, currently, currentTime, currentLocation, hours } = this.state

		// convert feelslike temp
		const feelsLike = handleFtoC(currently.apparentTemperature)
		if(this.state.loading) {
			return ( 
				<div className='bolt'>
					<i class='uil uil-bolt-alt'></i>
					<div>loading forecast</div>
				</div>
			)
		} else {
			return (
				<div className='background' style={{ 'backgroundImage': `url(${this.state.images[currentIcon]})` }} >
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
}

export default App