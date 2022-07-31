// const request = require('request')

// const geoLocation = (address,callbacks)=>{
//     geoCodeUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?access_token=pk.eyJ1Ijoic25zaGFoMjAyMCIsImEiOiJja2VuYWkzN2Yxd2VyMnFucGlsZnE0aXBwIn0.gEPeAV106SZHXDbpIJoTHQ&limit=1'

//     request({url: geoCodeUrl, json:true}, (error, {body}) => {
//         if(error){
//             callbacks('Unable to Connect with Location Services!!', undefined)
//         }
//         else if( body.features.length === 0 ){
//             callbacks('Location not found....try Another Location!!', undefined)
//         }
//         else{
//             callbacks(undefined, {
//                 latitude: body.features[0].center[1],
//                 longtitude: body.features[0].center[0],
//                 location: body.features[0].place_name
//             })
//         }
//     })
// }

// module.exports = geoLocation
