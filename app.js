const express = require('express');

const app = express();
const hostname = '127.0.0.1';
const port = 3000;
const articles = require('./articles');
const path = require('path');


app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'img')));

app.use('/', articles);

app.set('view engine', 'ejs');

app.listen(port, hostname, () => {
  console.info(`Server running at http://${hostname}:${port}/`);
});
