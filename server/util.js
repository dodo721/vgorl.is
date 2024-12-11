
const httpError = (httpcode, msg) => {
    const err = new Error(msg);
    err.httpcode = httpcode;
    return err;
};


module.exports = {
    httpError
}
