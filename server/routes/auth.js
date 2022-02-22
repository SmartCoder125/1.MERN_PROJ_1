
const express = require('express').Router();

const router = express;

const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');



const User = require('../models/userSchema.js')

const connection = require('../db/connection.js')


//

router.get('/', (req,res) => {

    res.send(`Hello from new auth,.js`)

});


// Registration Route


router.post('/register', async (req,res) => {

    const { name, email, phone, work, password, cpassword } = req.body;


    if(!name || !email || !phone || !work || !password || !cpassword)  {

        return res.status(422).json({error : 'All Feilds Mandotary!!!'})

    }

    // USING THE PROMISES FIRST METHOD.


//     User.findOne({email : email})
//     .then((userExist) => {
//         if(userExist) {
//             return res.status(422).json({error : 'Email already Exist'})
//         }
    

//      const user = new User({name, email, phone, work, password, cpassword})

//      user.save().then(()=> {

//         res.status(201).json({message : 'User registerd Sucessfully!!'})

//      }).catch((err) => {
//          res.status(500).json({error : 'Failed to Registerd!!!'})
//        })

//       }).catch((err) => {
//        console.log(err)
//    })



    // USING THE ASYNC AWAIT


    try{

        const userExist = await User.findOne({email : email})

        if(userExist)  {
            return res.status(422).json({errro : 'Email already Exist!!'})
        }

        
        else if(password != cpassword)  {

            return res.status(422).json({errro : 'Email already Exist!!'})

        }

        else {

            const user = new User({name, email, phone, work, password, cpassword })

            await user.save();

            res.status(201).json({message : "user registerd Sucessfully!"})

        }

       
        //  const user = new User({name, email, phone, work, password, cpassword })




        //  const userRegister = await user.save();
  
        //  if(userRegister) {
        //      res.status(201).json({message : "user Registered Sucessfully!"})
        //  } 

        //  else {
        //      res.status(500).json({error : "Failed to Register"})
        //  }



        // // TO HASH THE PASSWORD // //



        // const userRegister =  await user.save();


        // console.log(`${user} user registration sucessfllly`);

        // console.log(userRegister)



        // await user.save();

        // res.status(201).json({message : "user registerd Sucessfully!"})

    } 
     catch(err) {
         console.log(err)
     }

});



// LOGIN ROUTE


router.post('/signin', async (req,res)=> {

    // console.log(req.body)

    // res.json({message : 'Awesome'})


    try {

        let token;

        const {email, password} = req.body;

        if(!email || !password) {

            return res.status(400).json({error : 'Please fill the data!!!'})

        }

    const userLogin = await User.findOne({email : email}) 

    console.log(userLogin)


    if(userLogin)   {    ////////////

        // LOGIN WITH THE PASSWORD 

    const isMatch = await bcrypt.compare(password,userLogin.password)


        // JWT TOOKEN\

        token = await userLogin.generateAuthToken();

        console.log(token);


        // COOKIES STORE JWT TOKEN

        res.cookie("jwtoken", token, {

            expires : new Date(Date.now + 25892000000),

            httpOnly : true

        })


    // if(!userLogin)  {

        if(!isMatch)  {
        res.status(400).json({error : "Invalid Credentials"})
    }
    else {
        res.json({message : "user Signin Sucessfully!!!"})

    }


    }
    
    else  {      ////////

        res.status(400).json({error : 'Invalid Credentials'})

    }

    } catch(err) {
        console.log(err)
    }


})










module.exports = router;