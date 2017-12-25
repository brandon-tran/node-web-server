const express = require('express');

var app = express();

app.get('/', (req, res) => {
  res.send({
    name: 'Brandon',
    likes: [
      'people',
      'maroon5'
    ]
  })
});

app.get('/bad', (req, res) => {
  var errorMessage = 'Not good, dawg.'
  res.send(errorMessage);
})

app.listen(3000);
