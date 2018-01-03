const request = require('request');
const config = require('../config.js');
const saveRepos = require('../database/index.js');

let getReposByUsername = (username, callback) => {
  let options = {
    url: 'https://api.github.com/users/' + username + '/repos',
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  };

  request(options, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      var info = JSON.parse(body);
      saveRepos.save(info);
      callback();
    } else {
      console.log('error with requesting user\'s repos from API: ', error);
    }
  });

}

module.exports.getReposByUsername = getReposByUsername;