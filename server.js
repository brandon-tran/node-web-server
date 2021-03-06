const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log('Cant append to server.log.')
    }
  });
  next();
});

// app.use((req, res, next) => {
//   res.render('maintenance.hbs');
// });

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});
hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

app.get('/', (req, res) => {
  res.render('website.hbs', {
    pageTitle: 'Home',
    text: 'Welcome to my page'
  });
})

app.get('/projects', (req, res) => {
  res.render('website.hbs', {
    pageTitle: 'Projects',
    text: 'Welcome to my portfolio of projects'
  });
})

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About dawg'
  });
})

app.get('/bad', (req, res) => {
  var errorMessage = 'Not good, dawg.'
  res.send(errorMessage);
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
