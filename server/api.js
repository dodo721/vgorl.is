
const express = require('express');
const fs = require('fs');
const util = require('./util');
const Const = require('./constants');
const Perms = require('./perms');

const router = express.Router();

const getFileMetadata = (filepath) => {
    const metapath = filepath.replace(/\/$/m, "") + ".meta.json";
    try {
        const metastat = fs.fstatSync(metapath);
    catch (e) {
        console.error("ERROR GETTING METADATA", e);
        return null;
    }
    const fileText = fs.readFileSync(metapath, 'utf-8');
    const lines = fileText.split("\n");
    for (const line of lines) {
        const keyval = line.split(":")
    }
}

router.get('/ls/*', function(req, res) {
    // Check permission
    const path = Const.PUBLIC_DIRECTORY + req.path.replace("/ls", "");
    const perms = new Perms(path);
    if (!perms.isValid || !perms.canList()) {
        throw util.httpError(401, `Fuck off: perms validation failed`);
    }
    // ls files
    const files = fs.readdirSync(path);
    // remove reserved files
    for (file in Const.RESERVED_FILES) {
        const idx = files.indexOf(Const.RESERVED_FILES[file]);
        files.splice(idx, 1);
    }
    res.json(files);
});


module.exports = router;
