const fs = require('fs');

const Const = require('./constants');

class Perms {

    isValid = true;
    error = null;
    path = null;
    
    constructor (path) {
        let fileText = null;
        this.path = path;
        if (!fs.existsSync(path)) {
            this.invalidate(`Path not found`);
            return;
        }
        const stat = fs.statSync(path);
        if (stat.isDirectory()) {
            const permspath = path + "/" + Const.RESERVED_FILES.PERMS_TXT;
            if (!fs.existsSync(permspath)) {
                this.invalidate(`Directory has no _perms.txt`);
                return;
            }
            try {
                fileText = fs.readFileSync(permspath, 'utf-8');
            } catch (e) {
                this.invalidate(`Could not read _perms.txt`);
                return;
            }
            this.parseFile(fileText);
        } else {
            this.invalidate("Not supported");
            return;
        }
        this.isValid = true;
    }

    invalidate(error) {
        this.isValid = false;
        this.error = error;
        console.error(`Permission check on ${this.path} failed: ${error}`);
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
