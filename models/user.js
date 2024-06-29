const mongoose = require('mongoose');

const connect = mongoose.connect("mongodb://127.0.0.1:27017/login-tut");

connect.then(() => {
    console.log('Connected correctly to server');
})
.catch(() => {
    console.log('Connection failed');
})


const LoginSchema = new mongoose.Schema({
    number: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

const collection = new mongoose.model('user', LoginSchema);

module.exports = collection; 
