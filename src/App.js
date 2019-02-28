import React, { Component } from 'react'
import axios from 'axios'
import LocationDisplay from './components/LocationDisplay';
import TemperatureDisplay from './components/TemperatureDisplay';

class App extends Component {
	componentDidMount() {

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