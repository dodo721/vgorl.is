// npm modules
const express = require('express');
// src modules
const pager = require('./pager');
const api = require('./api');
const Const = require('./constants');

// express setup
const app = express();
app.set('view engine', 'ejs');
app.set('views', Const.VIEWS_DIRECTORY);

//page setup
const pageData = pager(Const.VIEWS_DIRECTORY);

// index
app.get('/', function(req, res) {
    let pages = pageData.tree();
    res.render('templates/default', {page: "index", pages});
});

// api
app.use('/api', api);

// fallback 404 page
app.get('*', function(req, res) {
    const pages = pageData.list();
    let page = req.path;
    if (pages[page]) {
        res.render('templates/default', {page, pages:pageData.tree()});
    } else {
        res.render('templates/error', {httpcode:404, error:"that's not a page silly!!! get your URI straight!!"})
    }
});

// error handler
app.use((err, req, res, next) => {
    // yield to default handler in case of express error
    console.error("[ERROR]", new Date().toISOString());
    console.error(err);
    if (res.headersSent) {
        return next(err);
    }
    const httpcode = err.httpcode || 500;
    res.status(httpcode).render('templates/error', {httpcode, error:err})
});

app.listen(Const.PORT, () => {
  console.log(`Server side renderer listening on port ${Const.PORT}`);
});

