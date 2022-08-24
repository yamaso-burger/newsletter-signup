const port = 3000;
const express = require('express');
const app = express();

app.get('/', (req, res)=>{
    res.send("express!!");
});

app.listen(port, ()=>{
    console.log("Server is running on port " + port);
});