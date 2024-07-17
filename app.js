const express = require('express');
const app = express();
const collection = require("./models/user");
const details = require("./models/details");
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const path = require('path');
const fs = require('fs');
const jwt = require('jsonwebtoken');

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());


app.get('/', function(req, res){
    res.render("index");
})

app.get('/login', function(req, res){
    res.render("login");
})

app.get('/register', function(req, res){
    res.render("register");
})


app.get('/details', function(req, res){
    res.render("details");
})


app.get('/user', isLogedIn, async function(req, res){
    let user = await collection.findOne({email: req.user.email});
    let users = await details.findOne({fullname: req.users.fullname});
    console.log(user)
    res.render("user", {user,users});
})

app.post('/register', async function(req, res){
    let {email, password, name, number} = req.body;
    let user = await collection.findOne({email});
    if(user) return res.status(500).send("User Alerady registerted");

    bcrypt.genSalt(10, function(err, salt){
        bcrypt.hash(password, salt, async (err, hash) => {
            let user = await collection.create({
                email,
                name,
                number,
                password: hash
            });
            let token = jwt.sign({email: email, password: password, name: name, number: number}, "shhhhh");
            res.cookie("token", token);
            res.redirect("/details");
        })
    })
})

app.post('/login', async function(req, res){
    let {email, password, name, number} = req.body;
    let user = await collection.findOne({email});
    if(!user) return res.status(500).send("User Not Found");

    bcrypt.compare(password, user.password, function(err, result){
        if(result){ 
            let token = jwt.sign({email: email, password: password, name: name, number: number}, "shhhhh");
            res.cookie("token", token);
            res.status(200).redirect("/user");
        }
        else res.redirect("/login");
    })
})

app.post('/details', async function(req, res){
    let {fullname, number, age, weight, height, dob, gender, disease} = req.body;
    // let user  = await details.findeOne({fullname});
    // if(user) return res.status(500).send("User Alerady Registered");
    let users = await details.create({
        fullname,
        number,
        age,
        weight,
        height,
        dob,
        gender,
        disease
    });
    let token = jwt.sign({fullname: fullname, number: number, age: age, weight: weight, height: height, dob: dob, gender: gender, disease: disease},"abhishek")
    res.cookie("token", token);
    res.redirect("/login");
})


app.get('/logout', function(req, res){
    res.cookie("token", "");
    console.log(token)
    res.redirect("/login"); 
})

function isLogedIn (req, res, next){
    if(req.cookies.token === "") res.redirect("/login");
    else{
        let data = jwt.verify(req.cookies.token, "shhhhh");
        req.user = data;
        next();
    }
}
app.listen(4001);