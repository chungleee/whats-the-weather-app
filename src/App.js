import React, { Component } from 'react'
import axios from 'axios'
import LocationDisplay from './components/LocationDisplay';
import TemperatureDisplay from './components/TemperatureDisplay';

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

	handleFtoC = (f) => {
		const c = (f - 32) * 5/9
		return Math.round( c * 10 ) / 10 .toString()
	}

	handleGetLocation = () => {
		return new Promise((resolve, reject) => {
			if(navigator.geolocation) {
				navigator.geolocation.getCurrentPosition((position) => {
					resolve(position)	
				})
			}	else {
				reject('Geolocation is NOT available')
			}
		})	
	}

	handleGetWeather = (coords) => {
			axios
				.get(`http://localhost:3000/currently/${coords.latitude},${coords.longitude}`)
				.then((response) => {
					console.log(response.data)

					const temperatureInC = this.handleFtoC(response.data.currently.temperature)


					this.setState({
						currentWeather: response.data.currently,
						temperatureInC
					})
				})
				.catch(error => {
					console.log(error)
				})
	}

	render() {
		const { temperatureInC, currentWeather, currentTime } = this.state

		return (
			<div className='container background'>
				<LocationDisplay lastUpdated={currentTime} />
				<TemperatureDisplay 
					degree={ temperatureInC } 
					summary={ currentWeather.summary }
				/>
			</div>
		)
	}
}

export default App