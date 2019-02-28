import React, { Component } from 'react'
import LocationDisplay from './components/LocationDisplay';
import TemperatureDisplay from './components/TemperatureDisplay';

class App extends Component {
	render() {
		return (
			<div className='background'>
				<LocationDisplay />
				<TemperatureDisplay />
			</div>
		)
	}
}

export default App