const express = require("express");
const path = require("node:path");
const app = express();
const fs = require('node:fs')
app.set("view engine", "ejs");

app.use(express.json());//to read json formatted data
app.use(express.urlencoded({extended: true})); //to get data from the frontend eg: forms
app.use(express.static(path.join(__dirname, 'public'))); // to use static files


app.get('/', (req, res) => {

    fs.readdir('./files', (err, files) => {
        console.log(files);
        res.render("index", {notes: files, dir: __dirname + "/files/"});
    })


})

app.post('/create', (req, res) => {
    console.log(req.body);
    if (req.body.title.length === 0) {
        res.redirect('/');
    } else {
        fs.writeFile(`./files/ ${req.body.title.split(" ").join('')}`, `${req.body.details}`, (err) => {
            if (err) console.log(err);
            res.redirect('/');
        })
    }
})

app.listen(5000, (err) => {
    if (err) console.log("Error: " + err.message);
    console.log("Server running on Port 5000")
})