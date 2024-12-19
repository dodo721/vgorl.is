
const httpError = (httpcode, msg) => {
    const err = new Error(msg);
    err.httpcode = httpcode;
    console.error("HTTP request failed: ", msg);
    return err;
};

const getByPath = (obj, path) => {
    return path.reduce((obj, item) => obj[item], obj);
}

const setByPath = (obj, path, val) => {
    if (path.length === 1) {
        obj[path[0]] = val;
        return;
    }
    const childObj = obj[path[0]];
    let newPath = path;
    newPath.splice(0, 1);
    setByPath(childObj, newPath, val);
}

module.exports = {
    httpError,
    getByPath,
    setByPath
}
