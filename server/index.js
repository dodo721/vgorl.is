// npm modules
const express = require('express');
const session = require('express-session');
const SQLiteStore = require('connect-sqlite3')(session);
const passport = require('passport');
// src modules
const pager = require('./pager');
const api = require('./api');
const auth = require('./auth');
const hub = require('./hub');
const constants = require('./constants');
const secrets = require('./secrets.json');

// express setup
const app = express();
app.set('view engine', 'ejs');
app.set('views', constants.VIEWS_DIRECTORY);

//page setup
const pageData = pager(constants.VIEWS_DIRECTORY);

// Authentication session handler
app.use(session({
	secret: secrets.session_secret,
	resave: false,
	saveUninitialized: false,
	store: new SQLiteStore({ db: 'sessions.db', dir: './' })
}));

//app.use(passport.initialize());
app.use(passport.authenticate('session'));

// Authentication message handler
app.use(function(req, res, next) {
	var msgs = req.session.messages || [];
	res.locals.messages = msgs;
	req.session.messages = [];
	next();
});




// index
app.get('/', function(req, res) {
    let pages = pageData.tree();
    res.render('templates/default', {page: "index", pages});
});

// api
app.use('/api', api);

// auth
app.use('/auth', auth);

// hub
app.use('/hub', hub);

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



// Initalize server
app.listen(constants.PORT, () => {
  console.log(`Server side renderer listening on port ${constants.PORT}`);
});

