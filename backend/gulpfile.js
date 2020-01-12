const gulp = require('gulp');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const rename = require('gulp-rename');
const autoprefixer = require('autoprefixer');

const DEST = './public/css';

gulp.task('run-sass', function() {
	return gulp
		.src('./public/scss/main.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(postcss([autoprefixer()]))
		.pipe(
			rename(function(path) {
				path.dirname = path.dirname.replace(/scss$/, '');
			})
		)
		.pipe(gulp.dest(DEST));
});

gulp.task('watch-sass', function() {
	gulp.watch('./public/**/*.scss', gulp.series(['run-sass']));
});

gulp.task('default', gulp.parallel(['run-sass', 'watch-sass']));
