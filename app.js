//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");

const app = express();
const port = 3000;
let items=[];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static(__dirname + "/public")) // To use local files on the server like styles.css

app.get("/", (req, res) => {
    let day = date.getDay();
    let time = date.getTime();

    res.render("list", {
        dayAndDate: day,
        timeRightNow: time,
        newItem: items,
    })
})

app.post("/", (req, res) => {
    let item = req.body.newItem;
    items.push(item);
    res.redirect("/")
})

app.listen(port, () => {
    console.log("Server started!");
})