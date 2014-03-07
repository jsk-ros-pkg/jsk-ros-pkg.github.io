// index.js

$(function() {
  // get all the repository
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
  
  var ORG_NAME = 'jsk-ros-pkg';
  
  function listRepository(org_name, list_id) {
    githubAPI('orgs/' + org_name + '/repos')
      .then(function(repos) {
        repos.sort(function(a, b) {
          return a.name > b.name;
        });
        console.log(repos.length + ' repository at ' + org_name);
        _.forEach(repos, function(repo) {
          console.log(repo);
          var name = repo.name;
          githubAPI('repos/' + org_name + '/' + repo.name + '/pulls')
            .then(function(pulls) {
              var ejs_data = {name: name, issue_num: repo.open_issues_count,
                              pr_num: pulls.length,
                              org_name: org_name};
              var html = ejs.render(repo_info_short_ejs, ejs_data);
              $(list_id + ' ul').append(html);
            });
        });
      });
  };
  listRepository('jsk-ros-pkg', '#jsk-ros-pkg-info');
  listRepository('start-jsk', '#start-jsk-info');
});
