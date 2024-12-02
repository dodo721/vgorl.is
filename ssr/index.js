
const util = require('util');
const fs = require('fs');
const exec = util.promisify(require('child_process').exec);
const express = require('express');
const app = express();

const PORT = 8080;
const VIEWS_DIRECTORY = "../views";

app.set('view engine', 'ejs');

app.set('views', VIEWS_DIRECTORY)

app.get('/', function(req, res) {
    res.render('templates/default', {page: '../pages/index'});
});

// index page
app.get('/:page/:subpage?', function(req, res) {

    const pageFiles = {};

    fs.readdirSync(VIEWS_DIRECTORY + "/pages/").forEach(file => {
        const stat = fs.lstatSync(file);
        if (stat.isFile() && file.endsWith(".ejs")) {
            const pageName = file.replace(".ejs", "");
            pageData[pageName] = "../pages/" + file
        } else if (stat.isDirectory()) {
            fs.readdirSync(VIEWS_DIRECTORY+"/pages/"+file+"/").forEach(subfile => {
                if (subfile.endsWith(".ejs")) {
                    pageFiles[file + "/" + subfile.replace(".ejs", "")] = "../pages/" + file + "/" + subfile;
                }
            });
        }
    });

    const pagePath = req.params.page;
    if (req.params.subpage)
        pagePath += "/" + req.params.subpage;
    const pageFile = pageFiles[pagePath];
    if (pageFile) {
        res.render('templates/default', {page: pagePath});
    } else {
        res.render('templates/error', {httpcode:404, error:"that's not a page silly!!! get your URI straight!!"})
    }
});

app.get('/test', async (req, res) => {
    const { stdout, stderr } = await exec('ls');
    res.send(stdout);
});

app.listen(PORT, () => {
  console.log(`Server side renderer listening on port ${PORT}`);
});

