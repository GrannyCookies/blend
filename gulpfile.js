'use strict'

const gulp = require('gulp')
const stylus = require('gulp-stylus')
const poststylus = require('poststylus')
const sourcemaps = require('gulp-sourcemaps')
const uglify = require('gulp-uglifyjs')

gulp.task('default', ['js', 'css'])

gulp.task('css', function() {
	gulp.src('styl/blend.styl')
	.pipe(sourcemaps.init())
	.pipe(stylus({
		compress: true,
		use: [
			poststylus([
				'autoprefixer',
				'rucksack-css'
			])
		]
	}))
	.pipe(sourcemaps.write('.'))
	.pipe(gulp.dest('dist'))
})

gulp.task('js', function() {
	gulp.src('js/**/*.js')
	.pipe(uglify('blend.js'), {
		outSourceMap: true,
	})
	.pipe(gulp.dest('dist'))
})

gulp.task('watch', ['js', 'css'], function() {
	gulp.watch('styl/**/*.styl', ['css'])
	gulp.watch('js/**/*.js', ['js'])
})
