const express = require("express");

const app = express();

app.get("/", function(req, res){
    res.send("<h1>Hello, world!</h1>");
});

app.get("/contact", function(req, res){
    res.send("<h1>Contact:</h1><h2>dragosionitac@gmail.com</h2>");
})

app.listen(3000, function(){
    console.log("Server started - port 3000");
});
