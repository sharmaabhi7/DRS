const mongoose = require('mongoose');


const connect = mongoose.connect("mongodb://127.0.0.1:27017/login-tut");


connect.then(() => {
    console.log('Connected correctly to user details');
})
.catch(() => {
    console.log('Connection failed');
})


const detailSechma = new mongoose.Schema({
   fullname:{
    type:String,
    required:true
   },
   number:{
    type:Number,
    required:true
   },
   email:{
    type:String
   },
   age:{
    type:Number,
    required:true
   },
   weight:{
    type:Number,
    required:true
   },
   height:{
    type:Number,
    required:true
   },
   dob:{
    type:String,
    required:true
   },
   gender:{
    type:String,
    required:true
   },
   disease:{
    type:String,
    required:true
   }

})


const details = new mongoose.model('details',detailSechma);

module.exports = details;