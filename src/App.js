import React, { Component } from 'react'
import axios from 'axios'
import LocationDisplay from './components/LocationDisplay';
import TemperatureDisplay from './components/TemperatureDisplay';
import DarkSkyAttribution from './components/DarkSkyAttribution';


class App extends Component {
	state = {
		currentWeather: {},
		temperatureInC: '',
		currentTime: '',
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
		// get request
			axios
				.get(`http://localhost:3000/currently/${coords.latitude},${coords.longitude}`)
				.then((response) => {
					// convert F to C
					const temperatureInC = this.handleFtoC(response.data.currently.temperature)
					// convert unix timestamp to local time
					const currentTime = this.handleUnixToDay(response.data.currently.time)
					// set the state
					this.setState({
						currentWeather: response.data.currently,
						temperatureInC,
						currentTime
					})
				})
				.catch(error => {
					console.log(error)
				})
	}

	render() {
		// destructuring
		const { temperatureInC, currentWeather, currentTime } = this.state

		return (
			<div className='background'>
				<div className="background-overlay"></div>
					<div className="container">
						<LocationDisplay lastUpdated={currentTime} />
						<TemperatureDisplay 
							degree={ temperatureInC } 
							summary={ currentWeather.summary }
						/>
						<DarkSkyAttribution />
					</div>
			</div>
		)
	}
}

export default App