
const express = require('express');
const fs = require('fs');
const util = require('./util');
const Const = require('./constants');
const Perms = require('./perms');
const jquery = require('jquery');
const { JSDOM } = require("jsdom");

const router = express.Router();

const getFileMetadata = (filepath) => {
    const metapath = filepath.replace(/\/$/m, "") + ".meta.json";
    // Find the meta file - silent fail if not found (we don't care)
    try {
        const metastat = fs.statSync(metapath);
    } catch (e) {
        return {};
    }
    // Extract meta from the file - throw if this fails
    let meta;
    try {
        meta = JSON.parse(fs.readFileSync(metapath, 'utf-8'));
    } catch (e) {
        throw new Error(`Could not read or parse meta for ${filepath} in ${metapath}:\n` + e.message);
    }
    return meta;
}

router.get('/ls/*', function(req, res) {
    // Check permission
    const path = Const.PUBLIC_DIRECTORY + req.path.replace("/ls", "");
    const perms = new Perms(path);
    if (!perms.isValid || !perms.canList()) {
        throw util.httpError(401, `Fuck off: perms validation failed`);
    }
    // ls files
    let files = fs.readdirSync(path);
    // remove reserved files
    const reserved = Object.values(Const.RESERVED_FILES);
    files = files.filter(x => !reserved.includes(x));
    // apply meta
    const result = {};
    files.forEach((file, i) => {
        // filter reserved
        for (const ext in Const.RESERVED_EXT) {
            if (file.endsWith(Const.RESERVED_EXT[ext])) {
                files.splice(i, 1);
                return;
            }
        }
        const metadata = getFileMetadata(path + "/" + file);
        result[file] = metadata;
    });
    res.json(result);
});

// Get latest k6bd imgggage for wallpaper
router.get('/k6bd.jpg', async function (req, res) {
    // get k6bd html code
    const web_fetch = await fetch("https://killsixbilliondemons.com/");
    if (web_fetch.status !== 200) {
        throw util.httpError(web_fetch.status, "Bad status code from K6BD website");
    }
    const html = await web_fetch.text();
    //console.log(html);
    const { window } = new JSDOM(html);
    const $ = jquery(window); 
    const image_url = $('#comic img').attr('src');
    const img_fetch = await fetch(image_url);
    if (img_fetch.status !== 200) {
        throw util.httpError(img_fetch.status, "Bad status code from K6BD image");
    }
    const img_bytes = await img_fetch.bytes();
    res.writeHead(200, {
        'Content-Type': 'image/jpeg',
        'Content-Length': img_bytes.length
    });
    res.end(Buffer.from(img_bytes, 'binary'));
});


module.exports = router;
