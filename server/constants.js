
// constants
const PORT = 8080;
const VIEWS_DIRECTORY = "../views";
const PUBLIC_DIRECTORY = "../public";
const RESERVED_FILES = {
    PERMS_TXT: "_perms.txt"
};
const RESERVED_EXT = {
    META: ".meta.json"
}

module.exports = {
    PORT,
    VIEWS_DIRECTORY,
    PUBLIC_DIRECTORY,
    RESERVED_FILES,
    RESERVED_EXT
};
