// const fetch = require('node-fetch')

// const body = {
//     "email":"shraddha@example.com",
//     "password":"Computergeek"
// };
// var mytoken
// const dologin = async ()=> {
// const response = await fetch('https://mytask-manager-api.herokuapp.com/users/login', {
// 	method: 'post',
// 	body: JSON.stringify(body),
// 	headers: {'Content-Type': 'application/json'}
// });

// const data = await response.json();
// console.log(data.token)
// mytoken = data.token
// }
// dologin();

// const dogetTask = async ()=> {
//     await dologin();
//     const response = await fetch('https://mytask-manager-api.herokuapp.com/tasks', {
//         method: 'get',
//         headers: {'Content-Type': 'application/json',
//     'Authorization':"Bearer "+mytoken}
//     });
    
//     const data = await response.json();
//     console.log(data)
//     }
// dogetTask();

// const bodysignup = {
//     "name":"shraddha_test_email_user2",
//     "email":"snshah2020@gmail.com",
//     "password": "Red123456"

// }
// const doSignup = async ()=> {
//     const response = await fetch('https://mytask-manager-api.herokuapp.com/users', {
//         method: 'post',
//         body: JSON.stringify(bodysignup),
//         headers: {'Content-Type': 'application/json'}
//     });
    
//     const data = await response.json();
//     console.log(data)
// }
// doSignup();


// const loginobj = (email, password, callback) => {
//     const url = 'https://mytask-manager-api.herokuapp.com/users/login'
//     console.log('hello')
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

// module.exports = loginobj