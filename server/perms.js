const fs = require('fs');

const Const = require('./constants');

class Perms {

    isValid = true;
    error = null;
    
    constructor (path) {
        let fileText = null;
        if (!fs.existsSync(path)) {
            this.isValid = false;
            this.error = "Not found";
            return;
        }
        const stat = fs.statSync(path);
        if (stat.isDirectory()) {
            const permspath = path + "/" + Const.PERMS_FILENAME;
            if (!fs.existsSync(permspath)) {
                this.isValid = false;
                this.error = "Directory has no _perms.txt";
                return;
            }
            try {
                fileText = fs.readFileSync(permspath, 'utf-8');
            } catch (e) {
                this.isValid = false;
                this.error = "Could not read _perms.txt";
                return;
            }
            this.parseFile(fileText);
        }
        this.isValid = false;
        this.error = "Not supported";
    }

    permissions = [];

    parseFile (fileText) {
        this.permissions = fileText.split("\n");
    }

    canList () {
        return this.permissions.includes("list");
    }

}


module.exports = Perms;
