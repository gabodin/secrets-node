//jshint esversion:6
const mongoose = require("mongoose");
const encrypt = require("mongoose-encryption");
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const {Users} = require("./entities/User");

const app = express();

app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
    extended: true
}));

mongoose.connect("mongodb://localhost:27017/secretsDB");

app.listen(3000, function(){
    console.log("Server running on port 3000");
})

app.get("/", function(req, res) {
    res.render("home");
});

app.get("/login", function(req, res) {
    res.render("login");
});

app.get("/register", function(req, res) {
    res.render("register");
});

app.post("/register", async function(req, res) {
    const usernameInput = req.body.username;
    const passwordInput = req.body.password;

    const newUser = new Users({
        email: usernameInput,
        password: passwordInput
    })
    try{
        await newUser.save();
        res.render("secrets");
    }
    catch(err) {
        console.log(err.message);
    }
});

app.post("/login", function(req, res) {
    const usernameInput = req.body.username;
    const passwordInput = req.body.password;

    Users.findOne({email:usernameInput}, function(err, foundUser) {
        if(err) {
            console.log(err);
        } else {
            if(foundUser) {
                if(foundUser.password === passwordInput) {
                    res.render("secrets");
                }
            }
        }
    });
});