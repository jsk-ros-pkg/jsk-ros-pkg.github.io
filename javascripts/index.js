// index.js

$(function() {
  // get all the repository
  var ORG_NAME = 'jsk-ros-pkg';
  var END_POINT_PREFIX = 'https://api.github.com/';

  function githubAPI(api) {
    var url = END_POINT_PREFIX + api;
    var deferred = new $.Deferred;
    console.log('accessing to ' + url);
    $.getJSON(url, function(result) {
      deferred.resolve(result);
    });
    return deferred.promise()
  };

  var repo_info_short_ejs = $('#repo-info-short').html();
  githubAPI('orgs/' + ORG_NAME + '/repos')
    .then(function(repos) {
      repos.sort(function(a, b) {
        return a.name > b.name;
      });
      console.log(repos.length + ' repository at ' + ORG_NAME);
      _.forEach(repos, function(repo) {
        var name = repo.name;
        var ejs_data = {name: name};
        var html = ejs.render(repo_info_short_ejs, ejs_data);
        $('#repository-list').append(html);
      });
    });
  
});
