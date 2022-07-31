// const e = require("express");

const loginForm = document.querySelector('#loginform')
const signup = document.querySelector('#signup')

const readtaskForm = document.querySelector('#readtaskform')


const new_task = document.querySelector("div.input-group input[name='newtask']")
const markAsComplete = document.querySelector("div.input-group button[name='combtn']")
const markAsIncomplete = document.querySelector("div.input-group button[name='incombtn']")

const task_id = document.querySelector("div.input-group input[name='task-id']")
const task_description = document.querySelector("div.input-group input[name='task-description']");
const Update_markAsComplete = document.querySelector("div.input-group button[name='update-combtn']");
const Update_markAsIncomplete = document.querySelector("div.input-group button[name='update-incombtn']");

const logout = document.querySelector("#logout")

const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const messageThree = document.querySelector('#message-3')
const messageFour = document.querySelector('#message-4')
const messageFive = document.querySelector('#message-5')
//User Signup form
signup.addEventListener('submit', (e) =>{
    e.preventDefault()
    var name = signup[0].value;
    var email = signup[1].value;
    var password = signup[2].value;
    
    const Url = '/users/signup'
    const data = {
        "name":name,
        "email":email,
        "password":password
    };
    const OtherParam = {
        method: 'post',
        body: JSON.stringify(data),
        headers: {'Content-Type': 'application/json'}
    }
    
    messageOne.textContent = 'verifying...'
    messageTwo.textContent = ''

    const getSignup = async () =>{
        try{
            const responseData = await fetch(Url, OtherParam)
            const Resultdata = await responseData.json()
            if(Resultdata.errors){
                console.log("inside client result data error");
                messageOne.textContent = JSON.stringify(Resultdata.message, undefined, 4)
            }
            else{
                messageOne.textContent = JSON.stringify(Resultdata, undefined, 4)
            }
        }
        catch(e){
            console.log("inside client from catch block");
            messageOne.textContent ="Oops Something went worng. Please provide valid details.";
        }
    }
    getSignup()   
})


// messageOne.textContent('From JavaScript')
// login User
loginForm.addEventListener('submit', (e) =>{
    e.preventDefault()
    var email = loginForm['email'].value;
    var password = loginForm['pwd'].value;
    const Url = '/users/login'
    const data = {
        "email":email,
        "password":password
    };
    const OtherParam = {
        method: 'post',
        body: JSON.stringify(data),
        headers: {'Content-Type': 'application/json'}
    }
    
    messageOne.textContent = 'verifying...'
    messageTwo.textContent = ''

    const getLogin = async () =>{
        try{
            const responseData = await fetch(Url, OtherParam)
            const Resultdata = await responseData.json()
            if(Resultdata.error){
                messageOne.textContent = Resultdata.error
            }
            else{
                messageOne.textContent = "login successfully"
                messageTwo.textContent = JSON.stringify(Resultdata, undefined, 4)
                localStorage.setItem('token',Resultdata.token)
            }
        }
        catch(e){
            console.log(e);
            messageOne.textContent = "Oops something went wrong!!"
        }
    }
    getLogin()   
})

// Logout User
logout.addEventListener('click', logoutUser)

function logoutUser(event){
    
    const Url = '/users/logout'
    const data = {
        "token": localStorage.getItem('token'),
    };
    const OtherParam = {
        method: 'post',
        body: JSON.stringify(data),
        headers: {'Content-Type': 'application/json'}
    }
    
    messageOne.textContent = 'logging out...'
    const logoutUser = async () =>{
        try{
            const responseData = await fetch(Url, OtherParam)
            if(responseData){
                console.log("inside client result");
                messageOne.textContent = "Logout successfully."
                localStorage.removeItem("token");
            }
            else{
                console.log("inside client error");
                messageOne.textContent = "Something went wrong!!"
            }
        }
        catch(e){
            console.log("inside client catch block");
            messageOne.textContent = "Something went wrong!!"
        }
    }
    logoutUser()
}


readtaskForm.addEventListener('submit', (e) =>{
    e.preventDefault()
    const Url = '/tasks'
    const data = {
        "token": localStorage.getItem('token')
    };
    const OtherParam = {
        method: 'post',
        body: JSON.stringify(data),
        headers: {'Content-Type': 'application/json'}
    }
    
    messageThree.textContent = 'Reading...'
    const readTask = async () =>{
        try{
            const responseData = await fetch(Url, OtherParam)
            const Resultdata = await responseData.json()
            if(Resultdata.error){
                messageThree.textContent = Resultdata.error
            }
            else{
                messageThree.textContent = JSON.stringify(Resultdata, undefined, 4)
            }
        }
        catch(e){
            console.log(e);
            messageThree.textContent ="Oops something went wrong!!"
        }
    }
    readTask()
})

markAsComplete.addEventListener('click', insertNewTask)
markAsIncomplete.addEventListener('click', insertNewTask)

function insertNewTask(event){
    var completed;
    if(event.target.name === "combtn" ){
        completed = true;    
    }
    if(event.target.name === "incombtn" ){
        completed = false;
    }
    const Url = '/tasks/create'
    const data = {
        "token": localStorage.getItem('token'),
        "description": new_task.value,
        "completed": completed
    };
    const OtherParam = {
        method: 'post',
        body: JSON.stringify(data),
        headers: {'Content-Type': 'application/json'}
    }
    
    messageFour.textContent = 'Inserting...'
    const insertNewTask = async () =>{
        try{
            const responseData = await fetch(Url, OtherParam)
            const Resultdata = await responseData.json()
            if(Resultdata.error){
                messageFour.textContent = Resultdata.error
                console.log(responseData.error)
            }
            else{
                messageFour.textContent = JSON.stringify(Resultdata, undefined, 4)
            }
        }
        catch(e){
            console.log(e)
        }
    }
    insertNewTask()
}

// update task operation
Update_markAsComplete.addEventListener('click', updateTask)
Update_markAsIncomplete.addEventListener('click', updateTask)

function updateTask(event){
    var completed;
    if(event.target.name === "update-combtn" ){
        completed = true;    
    }
    if(event.target.name === "update-incombtn" ){
        completed = false;
    }
    const Url = '/tasks/update'
    const data = {
        "token": localStorage.getItem('token'),
        "task_id" : task_id.value,
        "description": task_description.value,
        "completed": completed
    };
    const OtherParam = {
        method: 'post',
        body: JSON.stringify(data),
        headers: {'Content-Type': 'application/json'}
    }
    
    messageFive.textContent = 'Updating...'
    const UpdateTask = async () =>{
        try{
            const responseData = await fetch(Url, OtherParam)
            const Resultdata = await responseData.json()
            if(Resultdata.error){
                messageFive.textContent = Resultdata.error
                console.log(responseData.error)
            }
            else{
                messageFive.textContent = JSON.stringify(Resultdata, undefined, 4)
            }
        }
        catch(e){
            console.log(e)
        }
    }
    UpdateTask()
}