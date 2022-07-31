const express = require('express')
const path = require('path')
const hbs = require('hbs')
const fetch = require('node-fetch')
const cors = require('cors')
var axios = require('axios')
// var request1 = require('request')

// const { RSA_NO_PADDING } = require('constants')
const { query, response } = require('express')
const { execFile } = require('child_process')
// const geocode = require('./utils/GeoLocation.js')
// const forecast = require('./utils/Forecast.js')
// const login = require('./utils/Login.js')


const app = express()
const port = process.env.PORT || 3000

console.log(__dirname)
// Define paths for express config
const publicPathDirectory = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.use(cors({
    origin:'*'
}))

// Setup handlebar engine and view location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicPathDirectory))



app.get('', (req, res) => {

    res.render('index', {
        title: 'Task Manager',
        name: 'Shraddha Nand Shah'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Shraddha Nand Shah'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Shraddha Nand Shah'
    })
})

app.use(express.json())
app.post('/users/login', (req, res) => {
    // console.log(req.body)
    
    const email= req.body.email;
    const password = req.body.password;
    if(!req.body){
        return res.send({
            error: 'email and password must be provided'
        })
    }
    async function getUser() {
        try {
           const url = 'https://mytask-manager-api.herokuapp.com/users/login'
           const response = await axios.post(url, {email,password});
            console.log("inside server result");
            if(response)
            return res.send(response.data);
        } catch (error) {
            console.log("inside server error")
            return res.send(error)
        }
    }
    getUser();
})

//Signup user
app.post('/users/signup', (req, res) => {
    const name = req.body.name;
    const email= req.body.email;
    const password = req.body.password;
    if(!req.body){
        return res.send({
            error: 'name, email and password must be provided'
        })
    }
    async function createUser() {
        try {
           const url = 'https://mytask-manager-api.herokuapp.com/users/'
           const response = await axios.post(url, {name,email,password});
           console.log("inside try");
            return res.send(response.data);
        } catch (error) {
            console.log("inside server error"+error.response.data.message);
            return res.send(error.response.data);
        }
    }
    createUser();
})

// logout User
app.post('/users/logout', (req, res) => {
    const token= req.body.token;
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    if(!req.body){
        return res.send({
            error: 'Authtoken must be provided'
        })
    }
    async function logoutUser() {
        try {
           const url = 'https://mytask-manager-api.herokuapp.com/users/logout';
           const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization:
                "Bearer " + token,
            },
          });
        //    const response = await axios.post(url,config);
            if(response){
                console.log("inside server result");
            return res.send(response.data);
            }
        } catch (error) {
            console.log("inside server error block");
            return res.send(error);
        }
    }
    logoutUser();
})


app.post('/tasks', (req, res) => {
    // console.log(req.body)
    
    const token= req.body.token;
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    if(!req.body){
        return res.send({
            error: 'Authtoken must be provided'
        })
    }
    async function readTask() {
        try {
           const url = 'https://mytask-manager-api.herokuapp.com/tasks';
           const response = await axios.get(url,config);
            if(response){
                return res.send(response.data);
            }
        } catch (error) {
          return res.send(error);
        }
    }
    readTask();
})

app.post('/tasks/create', (req, res) => {
    // console.log(req.body)
    
    const token= req.body.token;
    const description = req.body.description;
    const completed = req.body.completed;
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    if(!req.body){
        return res.send({
            error: 'Authtoken must be provided'
        })
    }
    async function insertNewTask() {
        try {
           const url = 'https://mytask-manager-api.herokuapp.com/tasks';
           const response = await axios.post(url,{description, completed},config);
            if(response){
                return res.send(response.data);
            }
        } catch (error) {
          return res.send(error);
        }
    }
    insertNewTask();
})

app.post('/tasks/update', (req, res) => {
    // console.log(req.body)
    
    const token= req.body.token;
    const description = req.body.description;
    const completed = req.body.completed;
    const task_id = req.body.task_id;
    console.log(description);
    console.log(completed);
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    if(!req.body){
        return res.send({
            error: 'Authtoken must be provided'
        })
    }
    async function updateTask() {
        try {
           const url = 'https://mytask-manager-api.herokuapp.com/tasks';
           const response = await axios.patch(url+"/"+task_id,{description, completed},config);
            if(response){
                return res.send(response.data);
            }
        } catch (error) {
          return res.send(error);
        }
    }
    updateTask();
})


// app.get('/weather', (req, res) => {
//     if(!req.query.address) {
//         return res.send({
//             error: 'address must be provided'
//         })
//     }
//     geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
//         if(error){
//             return res.send({error})
//         }
//         forecast(latitude, longitude, (error, responseData) => {
//             if(error){
//                 return res.send({error})
//             }
//             res.send({
//                 forecast : responseData,
//                 location,
//                 address: req.query.address

//             })
//         })
//     })
//     // console.log(req.query.address)
//     // res.send({
//     //     forecast : 'it is raining',
//     //     location : 'singrauli',
//     //     address : req.query.address
//     // })
// })

// app.get('/products', (req, res) => {
//     if(!req.query.search) {
//         return res.send({
//             error: 'Search must be provided.'
//         })
//     }
//     console.log(req.query.search)
//     res.send({
//         product: {}
//     })
// })

app.get('/help/*', (req, res) => {
    res.render('404' , {
        title: '404',
        name: 'Error Message',
        errorMessage: 'Help manual is not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404' , {
        title: '404',
        name: 'Shraddha Nand Shah',
        errorMessage: 'This page not found.'
    })
})

app.listen(port, () => {
    console.log('Server is up on port '+ port)
})