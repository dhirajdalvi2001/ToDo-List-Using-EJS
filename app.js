//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;
let items=[];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static(__dirname + "/public")) // To use local files on the server like styles.css

app.get("/", (req, res) => {
    let optionsForDay = { weekday: 'long', month: 'long', day: 'numeric'};
    let optionsForTime ={ hour: "2-digit", minute: "2-digit" }

    const today = new Date();
    let day = today.toLocaleString("en-US", optionsForDay);

    today.toLocaleString();       // -> "2/1/2013 7:37:08 AM"
    let time = today.toLocaleTimeString("en-US", optionsForTime);  // -> "7:38:05 AM"

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