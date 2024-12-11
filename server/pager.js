
const fs = require('fs');

class Pages {

    viewsDir;

    constructor(viewsDir) {
        this.viewsDir = viewsDir;
    }

    list () {
        const pages = {};
        const parentDir = this.viewsDir + "/pages/";

        fs.readdirSync(parentDir).forEach(file => {
            const stat = fs.lstatSync(parentDir + file);
            const pageName = file.replace(".ejs", "");
            pages[pageName] = {isPage: false, subpages: []};
            if (stat.isFile() && file.endsWith(".ejs")) {
                pages[pageName].isPage = true;
            } else if (stat.isDirectory()) {
                fs.readdirSync(parentDir + file + "/").forEach(subfile => {
                    if (subfile.endsWith(".ejs")) {
                        pages[pageName].subpages.push(file + "/" + subfile.replace(".ejs", ""));
                    }
                });
            }
        });

        return pages;
    };

    topLevel () {
        return Object.keys(this.list()).filter(p => p !== "index");
    }
}

const pageFactory = (viewsDir) => {
    return new Pages(viewsDir);
}

module.exports = pageFactory;