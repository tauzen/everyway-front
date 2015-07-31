'use strict';

module.exports = function(grunt) {
  require('jit-grunt')(grunt);

  grunt.initConfig({
    less: {
      development: {
        options: {
          compress: true,
          yuicompress: true,
          optimization: 2
        },
        files: {
          'static/css/style.css': 'app/style/style.less'
        }
      }
    },
    browserify: {
      dev: {
        options: {
          transform: ['babelify', 'debowerify'],
          browserifyOptions: {
            debug: true
          }
        },
        src: 'app/js/**/*.js',
        dest: 'static/js/bundle-debug.js'
      },
      production: {
        options: {
          transform: ['babelify', 'debowerify', 'uglifyify']
        },
        src: '<%= browserify.dev.src %>',
        dest: 'static/js/bundle.js'
      }
    },
    watch: {
      styles: {
        files: ['app/style/*.less'],
        tasks: ['less'],
        options: {
          nospawn: true
        }
      },
      browserify: {
        files: 'app/js/**/*.js',
        tasks: ['browserify:dev']
      }
    }
  });
  grunt.registerTask('default', ['less', 'browserify:dev', 'watch']);
  grunt.registerTask('ci-build', ['less', 'browserify:dev']);
  grunt.registerTask('dist', ['less', 'browserify:production']);
};
