module.exports = function(grunt) {
  var resourcesDir = 'src/main/resources/assets';
  var browserifiedFile = resourcesDir + '/main.js';

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    browserify: {
      dist: {
        options: {
          transform: [
            ['babelify', {presets: ['react']}]
          ],
        },
        src: 'app/javascripts/main.js',
        dest: browserifiedFile
      }
    },
    uglify: {
      options: {
        mangle: true,
        compress: {
          dead_code: true,
          properties: true,
          conditionals: true,
          unused: true,
          join_vars: true,
          booleans: true,
          sequences: true
        }
      },
      build: {
        src: browserifiedFile,
        dest: resourcesDir + '/main.min.js'
      }
    },
    cssmin: {
      target: {
        files: {
          'src/main/resources/assets/main.min.css': ['app/stylesheets/*.css'],
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');

  grunt.registerTask('assets', ['browserify', 'uglify', 'cssmin']);
};
