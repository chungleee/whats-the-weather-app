import React, { Component } from 'react'
import axios from 'axios'
import LocationDisplay from './components/LocationDisplay';
import TemperatureDisplay from './components/TemperatureDisplay';

class App extends Component {
	componentDidMount() {
		this.handleGetWeather()
	}

	handleGetWeather = () => {
		axios.get('http://localhost:3000/weather')
			.then(response => {
				console.log(response)
			})
			.catch(error => {
				console.log(error)
			})
	}

	render() {
		return (
			<div className='container background'>
				<LocationDisplay />
				<TemperatureDisplay />
			</div>
		)
	}
}

export default App