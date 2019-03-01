import React from 'react'

const TemperatureDisplay = ({ degree, summary }) => {
	return (
		<div className='temp-box'>
			<h1 className='degree'>{ degree }&deg;</h1>
			<h5 className='weather'>{ summary }</h5>
		</div>
	)
}

export default TemperatureDisplay