
const fs = require('fs');
const { setByPath } = require('./util');

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
        if (!Object.keys(this.pages).length) {
            this.list();
        }
        const tree = {};
        for (const pagePath in this.pages) {
            const parts = pagePath.replace(/^\//m, "").split("/");
            let prevParts = [];
            parts.forEach((part, i) => {
                if (prevParts.length) {
                    setByPath(tree, [...prevParts, part], {});
                } else {
                    if (!tree[part])
                        tree[part] = {};
                }
                prevParts.push(part)
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