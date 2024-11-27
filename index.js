const express = require("express");
const path = require("node:path");
const app = express();
const fs = require('node:fs')
app.set("view engine", "ejs");

app.use(express.json());//to read json formatted data
app.use(express.urlencoded({extended: true})); //to get data from the frontend eg: forms
app.use(express.static(path.join(__dirname, 'public'))); // to use static files


const invalidFileNameCharacters = ["<", ">", ":", "\"", "/", "\\", "|", "?", "*", "?"];


app.get('/', (req, res) => {

    fs.readdir('./files', (err, files) => {
//        console.log(files);
        res.render("index", {notes: files});
    })


})


app.get('/files/:filename', (req, res) => {

    fs.readFile(`./files/${req.params.filename}`, "utf-8", (err, data) => {
        if (err) {
            console.log(`Error while reading file ${req.params.filename} :` + err.message);
            res.redirect('/')
        }

        res.render('filedata', {filedata: data, name: req.params.filename});
    })

})

app.post('/create', (req, res) => {
    const {title, details} = req.body;
    let newTitle = "";

    if (title.length === 0) {
        res.redirect('/');

    } else {
        invalidFileNameCharacters.forEach((val) => {
            if (title.includes(val)) {
                newTitle = title.split(val).join('');
            } else {
                newTitle = title;
            }
        })

        fs.writeFile(`./files/${newTitle.split(" ").join('')}`, `${details}`, (err) => {
            if (err) console.log(err);
            res.redirect('/');
        })
    }
})

app.listen(5000, (err) => {
    if (err) console.log("Error: " + err.message);
    console.log("Server running on Port 5000")
})