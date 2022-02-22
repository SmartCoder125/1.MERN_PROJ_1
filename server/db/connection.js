// DATABASE CONNECTION


const mongoose = require('mongoose');

const URL = process.env.URL;



mongoose.connect(URL).then(()=> {

    console.log(`Database Connected!!!`)

}).catch((err) => {

    console.log(`Somethings Went Wrong || Database Not Connected!!!`)

})