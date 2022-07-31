// const request = require('request')

// const forecast = (latitude, longitude, callback) => {
//     const url = 'http://api.weatherstack.com/current?access_key=fa852b51b737a8d2db21cd4465e0c9f3&query='+latitude+','+longitude
//     console.log('hello');
//     request({url, json:true}, (error, response) => {
//         if(error){
//             callback('Unable to connect with weather services!!', undefined)
//         }
//         else if( response.body.error) {
//             callback(undefined, 'Unable to forecast at given location...try some other location!')
//         }
//         else{
//             callback(undefined, response.body.current.weather_descriptions[0]+' in the morning. It is currently '+response.body.current.temperature+' degress out. There is a '+response.body.current.feelslike+'% chance of rain.')
//         }
//     })

// }

// module.exports = forecast 
