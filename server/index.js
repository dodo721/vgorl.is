// npm modules
const express = require('express');
// src modules
const pager = require('./pager');

// constants
const PORT = 8080;
const VIEWS_DIRECTORY = "../views";

// express setup
const app = express();
app.set('view engine', 'ejs');
app.set('views', VIEWS_DIRECTORY);

//page setup
const pageData = pager(VIEWS_DIRECTORY);

// index
app.get('/', function(req, res) {
    const pages = pageData.topLevel();
    res.render('templates/default', {page: 'index', title: '| | |', pages:pages});
});

// user pages
app.get('/:page/:subpage?', function(req, res) {

    const pages = pageData.list();

    let pagePath = req.params.page;
    if (req.params.subpage)
        pagePath += "/" + req.params.subpage;
    if (pages[pagePath]) {
        res.render('templates/default', {page: pagePath, pages:pageData.topLevel()});
    } else {
        res.render('templates/error', {httpcode:404, error:"that's not a page silly!!! get your URI straight!!"})
    }
});

// fallback 404 page
app.get('*', function(req, res) {
    res.render('templates/error', {httpcode:404, error:"that's not a page silly!!! get your URI straight!!"})
});

// error handler
app.use((err, req, res, next) => {
    // yield to default handler in case of express error
    if (res.headersSent) {
        return next(err);
    }
    res.render('templates/error', {httpcode:500, error:err})
});

app.listen(PORT, () => {
  console.log(`Server side renderer listening on port ${PORT}`);
});

