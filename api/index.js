const util = require('util');
const exec = util.promisify(require('child_process').exec);
const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/test', async (req, res) => {
    const { stdout, stderr } = await exec('ls');
    res.send(stdout);
});

app.listen(port, () => {
  console.log(`API server listening on port ${port}`);
});
