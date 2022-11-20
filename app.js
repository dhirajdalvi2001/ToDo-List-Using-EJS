//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
const port = process.env.PORT || 3000;

mongoose.connect("mongodb://localhost:27017/todolistDB", {useNewUrlParser: true});

app.set('view engine', 'ejs');
let items=[];

const itemsSchema = {
    name: String
};

const Item = mongoose.model("Item", itemsSchema);
const Item1 = new Item ({
    name: "Item1"
});
const Item2 = new Item ({
    name: "Item2"
});
const defaultItems = [Item1, Item2];

app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static(__dirname + "/public")) // To use local files on the server like styles.css

app.get("/", (req, res) => {
    Item.find({}, (err, result)=> {
        if (result.length === 0) {
            Item.insertMany(defaultItems, (err) => {
            if (err) {
                console.log(err);
            } else {
                console.log("Success");
            }
        });
        res.redirect("/");
        } else {
            res.render("list", {
            listHeading: "Today",
            newItem: result,
        })
        }
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