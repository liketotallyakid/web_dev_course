const express = require("express");
const bodyParser = require("body-parser");
const render = require("ejs");

// use our own module "date.js"
const date = require(__dirname + "/date.js");

const app = express();
app.set("view engine", "ejs");

// use body parser
app.use(bodyParser.urlencoded({extended: true}));

// have server send all files in "public" folder
app.use(express.static("public"));

const items = [];
const workItems = [];

app.get("/", function(req, res){
    const day = date.getDate();
    res.render("list", {listTitle: day, newListItems: items});

});

app.post("/", function(req, res){
    const item = req.body.newItem;

    if (req.body.list === "Work"){
        workItems.push(item);
        res.redirect("/work");
    } else {
        items.push(item);
        res.redirect("/");
    }
});

app.get("/work", function(req, res){
    res.render("list", {listTitle: "Work List", newListItems: workItems});
}); 

app.listen(3000, function(){
    console.log("open on port 3000");
});