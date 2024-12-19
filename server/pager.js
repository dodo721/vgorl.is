
const fs = require('fs');

class Page {
    name = null;
    filepath = null;

    constructor(name, filepath) {
        this.name = name;
        this.filepath = filepath;
    }
}

class Pages {

    viewsDir;
    pages = {};

    constructor(viewsDir) {
        this.viewsDir = viewsDir;
    }

    list (subDir="") {
        const parentDir = this.viewsDir + "/pages/" + subDir;
        fs.readdirSync(parentDir).forEach(file => {
            const name = file.replace(/\.ejs$/m, "");
            const stat = fs.lstatSync(parentDir + file);
            const pagePath = "/" + subDir + name;
            if (stat.isFile() && file.endsWith(".ejs")) {
                this.pages[pagePath] = new Page(name, parentDir + file);
            } else if (stat.isDirectory()) {
                this.list(file + "/");
            }
        });
        return this.pages;
    };

    tree () {
        const tree = {};
        for (const pagePath in this.pages) {
            const parts = pagePath.replace(/^\//m, "").split("/");
            let prevPart = null;
            parts.forEach((part, i) => {
                if (prevPart) {
                    tree[prevPart] = part;
                } else {
                    tree[part] = {};
                    prevPart = part;
                }
            });
        }
        return tree;
    }

    getPage (path) {
        return pages[path];
    }
}

const pageFactory = (viewsDir) => {
    return new Pages(viewsDir);
}

module.exports = pageFactory;