const express = require('express');
const bodyParser = require('body-parser');
const getRepos = require('../helpers/github.js');
const retrieveRepos = require('../database/index.js');
let app = express();

app.use(bodyParser.json());
app.use(express.static(__dirname + '/../client/dist'));

app.post('/repos', function (req, res) {
  getRepos.getReposByUsername(req.body.term, function() {
    res.json('request has been processed');
  });
});

app.get('/repos', function (req, res) {
  retrieveRepos.retrieve(function(repos) {
    console.log(repos);
    res.json(repos);
  })
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

