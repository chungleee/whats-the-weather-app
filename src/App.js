import React, { Component } from 'react'
import LocationDisplay from './components/LocationDisplay';
import TemperatureDisplay from './components/TemperatureDisplay';

import { darkSkyKey } from '../keys/apikey'

class App extends Component {
	state = {
		
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