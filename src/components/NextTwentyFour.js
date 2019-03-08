import React from 'react'

const NextTwentyFour = ({ hours }) => {
	console.log(hours)
	return (
		<div className='hourly-block'>
			{
				hours.map((hour, index) => {
					return (
						<div key={index} className='hourly-block-items'>
 							<h3>{hour.tempInC}&deg;</h3>
 							<h3><i className='uil uil-snowflake'></i></h3>
							<h3>{hour.currentTime}:00</h3>
						</div>
					)
				})
			}
		</div>
	)

	// return (
	// 	<div className='hourly-block'>
	// 		<div className='hourly-block-items'>
	// 			<h3>-5&deg;</h3>
	// 			<h3><i className='uil uil-snowflake'></i></h3>
	// 			<h3>13:00</h3>
	// 		</div>
	// 		<div className='hourly-block-items'>
	// 			<h3>-5&deg;</h3>
	// 			<h3><i className='uil uil-snowflake'></i></h3>
	// 			<h3>13:00</h3>
	// 		</div>
	// 		<div className='hourly-block-items'>
	// 			<h3>-5&deg;</h3>
	// 			<h3><i className='uil uil-snowflake'></i></h3>
	// 			<h3>13:00</h3>
	// 		</div>
	// 		<div className='hourly-block-items'>
	// 			<h3>-5&deg;</h3>
	// 			<h3><i className='uil uil-snowflake'></i></h3>
	// 			<h3>13:00</h3>
	// 		</div>
	// 		<div className='hourly-block-items'>
	// 			<h3>-5&deg;</h3>
	// 			<h3><i className='uil uil-snowflake'></i></h3>
	// 			<h3>13:00</h3>
	// 		</div>
	// 		<div className='hourly-block-items'>
	// 			<h3>-5&deg;</h3>
	// 			<h3><i className='uil uil-snowflake'></i></h3>
	// 			<h3>13:00</h3>
	// 		</div>
	// 		<div className='hourly-block-items'>
	// 			<h3>-5&deg;</h3>
	// 			<h3><i className='uil uil-snowflake'></i></h3>
	// 			<h3>13:00</h3>
	// 		</div>
	// 		<div className='hourly-block-items'>
	// 			<h3>-5&deg;</h3>
	// 			<h3><i className='uil uil-snowflake'></i></h3>
	// 			<h3>13:00</h3>
	// 		</div>
	// 		<div className='hourly-block-items'>
	// 			<h3>-5&deg;</h3>
	// 			<h3><i className='uil uil-snowflake'></i></h3>
	// 			<h3>13:00</h3>
	// 		</div>
	// 	</div>
	// )
}

export default NextTwentyFour