module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
        mangle: true
      },
      build: {
        src: 'js/main.js',
        dest: 'js/main.min.js'
      }
    },
	copy: {
		main: {
			src: './**',
			dest: '/var/www/html/zestybytes.com/public_html/',
		},
	},
	watch: {
		scripts: {
			files: ['**/*.js', '**/*.css', '**/*.html', '**/*.php'],
			tasks: ['default'],
			options: {
				spawn: false,
			},
		},
	}
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task(s).
  grunt.registerTask('default', ['uglify', 'copy']);
};
