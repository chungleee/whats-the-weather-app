import React from 'react'

const LocationDisplay = ({ lastUpdated }) => {
	return (
		<div className='location-box'>
			<h3 className='city'>Montreal</h3>
			<h5 className='date'>Last updated: { lastUpdated }</h5>
		</div>
	)
}

export default LocationDisplay