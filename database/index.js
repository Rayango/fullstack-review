const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = mongoose.Schema({
  github_id: { type: String, unique: true} ,
  name: String,
  html_url: String,
  description: String,
  stargazers: Number
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (repos) => {
  for (var i = 0; i < repos.length; i++) {
    var repo = repos[i];
    var newRepo = new Repo({
      github_id: repo.id,
      name: repo.name,
      html_url: repo.html_url,
      description: repo.description,
      stargazers: repo.stargazers_count
    });

    newRepo.save(function(err) {
      if (err) {
        console.log('error, repo could not be saved: ', err);
      }
    })
    // Repo.findOne({ github_id: newRepo.github_id }, function(err, result) {
    //   if (err) {
    //     console.log('error in validating if repo is present: ', error)
    //     return;
    //   } 
    //   if (!result) {
    //     newRepo.save(function(err) {
    //       if (err) {
    //         console.log('error, repo could not be saved: ', err);
    //       }
    //     })
    //   }
    // });
  }
}

let retrieve = (callback) => {
  // Repo.find(function(err, repos) {
  //   if (err) {
  //     console.log('error with retrieving repos: ', err);
  //   } else {
  //     console.log('repo retrieved!');
  //     callback(repos);
  //   }
  // })
  Repo.find({}).sort({ stargazers: 'desc' }).exec(function(err, repos) {
    if (err) {
      console.log('error with retrieving repos: ', err);
    } else {
      console.log('repo retrieved!');
      callback(repos);
    }
  });
}

module.exports.save = save;
module.exports.retrieve = retrieve;