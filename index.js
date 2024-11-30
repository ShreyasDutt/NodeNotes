const express = require("express");
const path = require("node:path");
const app = express();
const fs = require('node:fs')
const fss = require('node:fs/promises')
app.set("view engine", "ejs");

app.use(express.json());//to read json formatted data
app.use(express.urlencoded({extended: true})); //to get data from the frontend eg: forms
app.use(express.static(path.join(__dirname, 'public'))); // to use static files


const invalidFileNameCharacters = ["<", ">", ":", "\"", "/", "\\", "|", "?", "*", "?"];


app.get('/', (req, res) => {

    fs.readdir('./files', (err, files) => {
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

app.post('/delete/:filename', (req, res) => {
    fs.unlink(`./files/${req.params.filename}`, (err) => {
        if (err) console.log("Error while DELETE : " + err.message);
        res.redirect('/')
    })
})

app.get('/edit/:filename', (req, res) => {

    fs.readFile(`./files/${req.params.filename}`, "utf-8", (err, data) => {
        if (err) {
            console.log(`Error while reading file ${req.params.filename} :` + err.message);
            res.redirect('/')
        }

        res.render('edit', {filedata: data, name: req.params.filename});
    })
})


app.post("/edit/:filename", async (req, res) => {
    try {
        let originalFilename = req.params.filename;
        let newFilename = req.body.filename;
        let newFileData = req.body.filedata;

        const currentData = await fss.readFile(`./files/${originalFilename}`, "utf-8");

        if (originalFilename !== newFilename) {
            await fss.rename(`./files/${originalFilename}`, `./files/${newFilename}`);
            originalFilename = newFilename;
        }


        if (currentData !== newFileData) {
            await fss.writeFile(`./files/${originalFilename}`, newFileData, "utf-8");
        }

        res.redirect("/");
    } catch (err) {
        console.error(err.message);
        res.status(500).send("An error occurred");
    }
});


app.listen(5000, (err) => {
    if (err) console.log("Error: " + err.message);
    console.log("Server running on Port 5000")
})