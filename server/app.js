// EXPRESS AND ITS OBJECT

const express = require('express');

const app = express();


// DOTENV CONFIGURATION

const dotenv = require('dotenv');

dotenv.config({path : './.env'})


// DATABASE CONNECTION

const connection = require('./db/connection.js')

connection;


// FILE USE

const User = require('./models/userSchema.js')

const auth = require('./routes/auth.js')

app.use(express.json())

app.use(auth)

const PORT = process.env.PORT || 3000;


// MIDDLEWARE

const middleware = (req,res,next) => {
    console.log(`Hello from middleware`)
    next();
}



// ALL ROUTING 

app.get('/', (req,res) =>  {
    res.send(`Hello World From The Server`)
})


app.get('/about',middleware ,(req,res) => {
    console.log(`hello from about`)
    res.send(`Hello world from contact`);
})

app.get('/contact', (req,res)=> {

    res.cookie('Test', 'jay')

    res.send(`Hello From Contact`)
})

app.get('/signin', (req,res)=> {
    res.send(`Hello From signin`);
})

app.get('/signup', (req,res) => {
    res.send(`Hello From signup page`)
})




app.listen(PORT, () => {
    console.log(`Listening on the Port ${PORT}`)
})