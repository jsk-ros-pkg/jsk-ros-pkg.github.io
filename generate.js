var util = require('util');
var repos = ['jsk_common', 'openrave_planning', 'jsk_visualization', 'jsk_smart_apps', 'jsk_roseus', 'jsk_robot', 'jsk_recognition', 'jsk_pr2eus', 'jsk_planning', 'jsk_openni_kinect',
             'jsk_model_tools', 'jsk_demos', 'jsk_control'];

repos.forEach(function(repo) {
  var content = util.format('[%s](http://github.com/jsk-ros-pkg/%s) [![Build Status](https://travis-ci.org/jsk-ros-pkg/%s.png)](https://travis-ci.org/jsk-ros-pkg/%s)\n\
---\n\
',
                            repo.replace(/_/g, '\\_'),
                            repo,
                            repo,
                            repo
                           );
  console.log(content);
});
