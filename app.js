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

const listSchema = {
    name: String,
    items: [itemsSchema]
}

const Item = mongoose.model("Item", itemsSchema);
const List = mongoose.model("List", listSchema);

const Item1 = new Item ({
    name: "Add Something..."
});
const defaultItems = [Item1];

app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static(__dirname + "/public")) // To use local files on the server like styles.css

app.get("/", (req, res) => {
    Item.find({}, (err, result)=> {
            res.render("list", {
            listHeading: "Today",
            newItem: result
        })
    })
})

app.get("/:customList", (req, res) => {
    const customList = req.params.customList;

    List.findOne({name: customList}, (err, foundList) => {
        if (!err) {
            if (!foundList) {
                    const list = new List({
                    name: customList,
                    items: defaultItems
                    });
                list.save();
                res.redirect("/" + customList);
            } else {
            res.render("list", {
            listHeading: foundList.name,
            newItem: foundList.items,
            })
        }
        }
    })
})

app.post("/", (req, res) => {
    let item = req.body.newItem;
    let list = req.body.list;
    const newItemAdded = new Item ({
        name: item
    });
    if (list == "Today") {
        newItemAdded.save();    
        res.redirect("/")
    } else {
        List.findOne({name: list}, (err, foundList) => {
            foundList.items.push(newItemAdded);
            foundList.save();
                res.redirect("/" + list);
        })
    }
})

app.post("/delete", (req, res) => {
    const itemId = req.body.checkBox;
    const list = req.body.list;
    
    if (list == "Today") {
        Item.findByIdAndRemove(itemId, (err) => {
        if (!err) {
            res.redirect("/");
        } else {
            console.log(err);
        }
        })
    } else {
        List.findOneAndUpdate({name: list}, {$pull: {items: {_id: itemId}}}, (err, foundList) => {
            if (!err) {
                res.redirect("/" + list);
            } else {
                console.log(err);
            }
        });
    }
})
 
app.listen(port, () => {
    console.log("Server started!");
})