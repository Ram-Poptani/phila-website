var gulp = require('gulp'),
    rename = require('gulp-rename'),
    del = require('del'),
    svgSprite = require('gulp-svg-sprite');

var config = {
    mode : {
        css : {
            sprite : 'sprite.svg',
            render : {
                css : {
                    template : './gulp/templates/sprite.css'
                }
            }
        }
    }
};
gulp.task('beginClean', function(){
   return del(['./app/temp/sprites', './app/assets/images/sprites']);
});

gulp.task('createSprite', function(){
    return gulp.src('./app/assets/images/icons/**/*.svg')
            .pipe(svgSprite(config))
            .pipe(gulp.dest('./app/temp/sprites/'));
});

gulp.task('copySpriteCSS', function(){
    return gulp.src('./app/temp/sprites/css/**/*.css')
            .pipe(rename('_sprite.css'))
            .pipe(gulp.dest('./app/assets/styles/modules'));
});

gulp.task('copySpriteGraphics', function(){
    return gulp.src('./app/temp/sprites/css/**/*.svg')
            .pipe(gulp.dest('./app/assets/images/sprites'));
});

gulp.task('endClean', function(){
    return del(['./app/temp/sprites']);
});

gulp.task('generateIcons', gulp.series(['beginClean', 'createSprite', 'copySpriteCSS', 'copySpriteGraphics']));
