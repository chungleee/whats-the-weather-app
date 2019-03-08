// unix timestamp converter
export const handleUnixToDay = (unix_timestamp) => {
	const date = new Date(unix_timestamp*1000)
	return date.toLocaleString()
}

// F to C converter
export const handleFtoC = (f) => {
	const c = (f - 32) * 5/9
	return Math.round( c * 10 ) / 10 .toString()
}