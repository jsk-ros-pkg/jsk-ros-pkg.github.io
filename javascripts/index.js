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
        var all_request = _.map(repos, function(repo) {
          var deferred = new $.Deferred;
          githubAPI('repos/' + org_name + '/' + repo.name + '/pulls')
            .then(function(pulls) {
              deferred.resolve({repo: repo, pulls: pulls});
            });
          return deferred.promise();
        });
        $.when.apply(null, all_request).then(function() {
          var all_results = arguments;
          _.forEach(all_results, function(result) {
            var repo = result.repo;
            var pulls = result.pulls;
            var ejs_data = {name: repo.name, issue_num: repo.open_issues_count,
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
