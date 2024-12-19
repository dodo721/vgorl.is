
const httpError = (httpcode, msg) => {
    const err = new Error(msg);
    err.httpcode = httpcode;
    console.error("HTTP request failed: ", msg);
    return err;
};


module.exports = {
    httpError
}
