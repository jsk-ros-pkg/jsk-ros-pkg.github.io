module.exports = function(grunt) {
  var pkg = grunt.file.readJSON('package.json');
  var less_parameter = {
    options: {
      paths: ['less/']
    },
    files: {
      'css/style.css': 'less/style.less'
    }
  };
  grunt.initConfig({
    less: {
      development: less_parameter,
      production: less_parameter
    },
    watch: {
      files: ['./less/*.less', 'Gruntfile.js'],
      tasks: ['build']
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      files: [
        'Gruntfile.js',
        'javascripts/*.js'
      ]
    }
  });

  // reading npm tasks
  for(var taskName in pkg.devDependencies) {
    if(taskName.substring(0, 6) === 'grunt-'.toString()) {
      grunt.loadNpmTasks(taskName);
    }
  }
  
  grunt.registerTask('build', ['jshint', 'less']);
  grunt.registerTask('default', ['build']);
};
