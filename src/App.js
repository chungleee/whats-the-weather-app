import React, { Component } from 'react'
import axios from 'axios'
import moment from 'moment'
import LocationDisplay from './components/LocationDisplay';
import TemperatureDisplay from './components/TemperatureDisplay';

class App extends Component {
	state = {
		currentWeather: {},
		currentTime: ''
	}

	componentDidMount() {
		this.handleGetWeather()
		this.handleConvertTime(this.state.currentWeather.time)
	}

	handleConvertTime = (number) => {
		const day = moment(number).calendar()
		console.log(day)
		this.setState({
			currentTime: day
		})
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