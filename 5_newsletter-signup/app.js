const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res){
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;

    const data = {
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

    var jsonData = JSON.stringify(data);

    const url = "https://us7.api.mailchimp.com/3.0/lists/84e4c9ef3c";
    const options = {
        method: "POST",
        auth: "dragon:523fbfc6b5f73f5011b35a83f5de0ef1-us7"

    };
    const apiRequest = https.request(url, options, function(response){
        if (response.statusCode === 200){
            res.sendFile(__dirname + "/success.html");
        } else {
            res.sendFile(__dirname + "/failure.html");
        }
        response.on("data", function(data){
            console.log(JSON.parse(data));
        });
    });
    apiRequest.write(jsonData);
    apiRequest.end();
});

app.post("/failure", function(req, res){
    res.redirect("/");
});

app.listen(process.env.PORT || 3000, function(){
    console.log("open on port process.env");
}); //process.env.PORT for heroku port


// API KEY
// 523fbfc6b5f73f5011b35a83f5de0ef1-us7

// audience list KEY
// 84e4c9ef3c