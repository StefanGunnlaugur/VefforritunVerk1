/* útfæra greina virkni */
const fs = require('fs');

const express = require('express');

const fm = require('front-matter');

const util = require('util');

const MarkdownIt = require('markdown-it');

const md = new MarkdownIt();

const router = express.Router();
const encoding = 'utf8';

const articleName = ['batman-ipsum.md', 'corporate-ipsum.md', 'deloren-ipsum.md', 'lorem-ipsum.md'];
const title = [];
const dags = [];

const dagsParse = [];
let firstImage = '';
let secondImage = '';

const readFileAsync = util.promisify(fs.readFile);

router.get('/', (req, res) => {
  readFileAsync(`./articles/${articleName[0]}`, encoding, (err, data) => {
    const content = fm(data);
    title[0] = md.render(content.attributes.title);
    dags[0] = md.render(content.attributes.date);
    const d = new Date(dags[0].substring(3, 42));
    dagsParse[0] = `<p> ${d.getDate()}.${d.getMonth() + 1}.${d.getFullYear()} </p>`;
  });
  readFileAsync(`./articles/${articleName[1]}`, encoding, (err, data) => {
    const content = fm(data);
    title[1] = md.render(content.attributes.title);
    dags[1] = md.render(content.attributes.date);
    firstImage = md.render(content.attributes.image).substring(8, 27);

    const d = new Date(dags[1].substring(3, 42));
    dagsParse[1] = `<p> ${d.getDate()}.${d.getMonth() + 1}.${d.getFullYear()} </p>`;
  });
  readFileAsync(`./articles/${articleName[2]}`, encoding, (err, data) => {
    const content = fm(data);
    title[2] = md.render(content.attributes.title);
    dags[2] = md.render(content.attributes.date);
    const d = new Date(dags[2].substring(3, 42));
    dagsParse[2] = `<p> ${d.getDate()}.${d.getMonth() + 1}.${d.getFullYear()} </p>`;
  });
  readFileAsync(`./articles/${articleName[3]}`, encoding, (err, data) => {
    const content = fm(data);
    title[3] = md.render(content.attributes.title);
    dags[3] = md.render(content.attributes.date);
    secondImage = md.render(content.attributes.image).substring(9, 24);
    const d = new Date(dags[3].substring(3, 42));
    dagsParse[3] = `<p> ${d.getDate()}.${d.getMonth() + 1}.${d.getFullYear()} </p>`;
    res.render('./index.ejs', {
      image1: firstImage,
      image2: secondImage,
      title1: title[0],
      title2: title[1],
      title3: title[2],
      title4: title[3],
      date1: dagsParse[0],
      date2: dagsParse[1],
      date3: dagsParse[2],
      date4: dagsParse[3],
    });
  });
});

router.get('/na-na-na-na-batman', (req, res) => {
  fs.readFile('./articles/batman-ipsum.md', encoding, (err, data) => {
    const content = fm(data);
    title[0] = md.render(content.attributes.title);
    const bodyArticle = md.render(content.body);
    res.render('./article.ejs', { title: title[0], body: bodyArticle });
  });
});


router.get('/corporate-stooge', (req, res) => {
  fs.readFile('./articles/corporate-ipsum.md', encoding, (err, data) => {
    const content = fm(data);
    title[1] = md.render(content.attributes.title);
    const bodyArticle = md.render(content.body);
    res.render('./article.ejs', { title: title[1], body: bodyArticle });
  });
});

router.get('/flux-capacitor', (req, res) => {
  fs.readFile('./articles/deloren-ipsum.md', encoding, (err, data) => {
    const content = fm(data);
    title[2] = md.render(content.attributes.title);
    const bodyArticle = md.render(content.body);
    res.render('./article.ejs', { title: title[2], body: bodyArticle });
  });
});

router.get('/lorem-ipsum', (req, res) => {
  fs.readFile('./articles/lorem-ipsum.md', encoding, (err, data) => {
    const content = fm(data);
    title[3] = md.render(content.attributes.title);
    const bodyArticle = md.render(content.body);
    res.render('./article.ejs', { title: title[3], body: bodyArticle });
  });
});

router.use((req, res) => {
  res.status(404).render('./error.ejs');
});

router.use((err, req, res) => {
  res.status(500).send('Error occured');
});

module.exports = router;
