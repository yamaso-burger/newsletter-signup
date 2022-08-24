const port = 3000;
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const request = require('request');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res)=>{
    res.sendFile(__dirname + '/signup.html');
});

app.post('/', (req, res)=>{
    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    var email = req.body.email;
    console.log("Fist name: " + firstName);
    console.log("Last name: " + lastName);
    console.log("Email: " + email);

    res.sendFile(__dirname + "/success.html");
});

app.listen(port, ()=>{
    console.log("Server is running on port " + port);
});