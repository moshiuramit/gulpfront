/////////////////////////////////////
// Required 
/////////////////////////////////////

var gulp = require('gulp'),
		uglify = require('gulp-uglify'),
		sass = require('gulp-ruby-sass'),
		plumber = require('gulp-plumber'),
		compass = require('gulp-for-compass'),
		//livereload = require('gulp-livereload');
		connect = require('gulp-connect');


var outputDir = 'app';
/////////////////////////////////////
// Script Tasks
/////////////////////////////////////

// Scripts Task 

gulp.task('scripts', function() {
	gulp.src('app/js/*.js')
	  .pipe(plumber())
	  .pipe(uglify())
	  .pipe(gulp.dest('app/build/js/'))
	  .pipe(connect.reload());
});

// Style Task

gulp.task('styles', function(){
	gulp.src('app/scss/*.scss')
			.pipe(plumber())
			.pipe(compass({
            sassDir: 'app/scss',
            cssDir: 'app/build/css',
            force: true
        }))
			.pipe(connect.reload());
});

// html Task 
gulp.task('html', function() {
	gulp.src('app/*.html')
	.pipe(connect.reload());
	console.log("html Task");

});

// Watch Task 

gulp.task('watch', function () {
	//var server = livereload();
		gulp.watch('app/js/*.js',['scripts']);
		gulp.watch('app/*.html',['html']);
		gulp.watch('app/scss/*.scss', ['styles']);
});

// connect 

gulp.task('connect', function(){
	connect.server({
			root: 'app', 
			open: { browser: 'Google Chrome'},
			livereload: true
		});
});


gulp.task('default',['html', 'scripts', 'styles', 'connect', 'watch' ]);
