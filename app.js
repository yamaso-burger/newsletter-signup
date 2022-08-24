const port = 3000;
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const request = require('request');
const https = require('https');
const { json } = require('body-parser');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res)=>{
    res.sendFile(__dirname + '/signup.html');
});

app.post('/', (req, res)=>{
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    console.log("Fist name: " + firstName);
    console.log("Last name: " + lastName);
    console.log("Email: " + email);

    var data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    };

    const jsonData = JSON.stringify(data);

    const url = "https://us13.api.mailchimp.com/3.0/lists/854863a56c";

    const options = {
        method: "POST",
        auth: "yamaso:2d1ccfb565c51ccd8d921fbb29361b1-us13"
    }

    const request = https.request(url, options, function(response){
        response.on("data", function(data){
            console.log(JSON.parse(data));
        });

        if (response.statusCode === 200){
            console.log("statuscode is " + response.statusCode);
            res.sendFile(__dirname + "/success.html");
        }else {
            res.sendFile(__dirname + "/failure.html");
        }
    });

    request.write(jsonData);
    request.end();
    

});

app.post('/failure', (req, res)=>{
    res.redirect("/");
});


// api key
// 24d1ccfb565c51ccd8d921fbb29361b1-us13
// List Id
// 854863a56c

app.listen(port, ()=>{
    console.log("Server is running on port " + port);
});