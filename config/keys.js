// module.exports = {
// 	darkSkyKey: '64c96962b29d94d9b1dcb2e5683dac52',
// 	googleMapsKey: 'AIzaSyCH3ygvXevD_Jslimrnbe7EgL9wlmZA2Ss'
// }

if(process.env.NODE_ENV === 'production') {
	module.exports = require('./keys_prod')
} else {
	module.exports = require('./keys_dev')
}