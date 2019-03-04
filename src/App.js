import React, { Component } from 'react'
import axios from 'axios'
import LocationDisplay from './components/LocationDisplay';
import TemperatureDisplay from './components/TemperatureDisplay';

class App extends Component {
	state = {
		currentWeather: {},
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
					this.setState({
						currentWeather: response.data.currently
					})
				})
				.catch(error => {
					console.log(error)
				})
	}

	render() {
		const { currentWeather, currentTime } = this.state

		return (
			<div className='container background'>
				<LocationDisplay lastUpdated={currentTime} />
				<TemperatureDisplay 
					degree={ currentWeather.temperature } 
					summary={ currentWeather.summary }
				/>
			</div>
		)
	}
}

export default App