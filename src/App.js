import React, { Component } from 'react'
import axios from 'axios'
import LocationDisplay from './components/LocationDisplay';
import TemperatureDisplay from './components/TemperatureDisplay';

class App extends Component {
	state = {
		currentWeather: {}
	}

	componentDidMount() {
		this.handleGetWeather()
	}

	handleGetWeather = () => {
		axios.get('http://localhost:3000/currently')
			.then(response => {
				console.log(response.data)
				this.setState({
					currentWeather: response.data
				})
			})
			.catch(error => {
				console.log(error)
			})
	}

	render() {
		const { currentWeather } = this.state

		return (
			<div className='container background'>
				<LocationDisplay />
				<TemperatureDisplay 
					degree={ currentWeather.temperature } 
					summary={ currentWeather.summary }
				/>
			</div>
		)
	}
}

export default App