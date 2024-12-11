
const express = require('express');
const fs = require('fs');
const util = require('./util');
const Const = require('./constants');
const Perms = require('./perms');

const router = express.Router();

router.get('/list', function(req, res) {
    const path = Const.PUBLIC_DIRECTORY + req.path;
    const perms = new Perms(path);
    if (!perms.isValid || !perms.canList()) {
        throw util.httpError(401, `Fuck off: ${perms.error}`);
    }
    res.send("No error :))");
});


module.exports = router;
