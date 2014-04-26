module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    smash: {
      bundle: {
        src: 'src/index.js',
        dest: './wtf.js'
      }
    },

    uglify: {
      dist: {
        files: {
          './wtf.min.js': ['./wtf.js']
        }
      }
    },

    nodeunit: {
      all: ['test/*_test.js']
    }

  });

  grunt.loadNpmTasks('grunt-smash');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  grunt.registerTask('default', ['smash', 'uglify', 'test']);
  grunt.registerTask('test', ['nodeunit']);
};
