const port = 3000;
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(express.static(__dirname));

app.get('/', (req, res)=>{
    res.sendFile(__dirname + '/signup.html');
});

app.listen(port, ()=>{
    console.log("Server is running on port " + port);
});