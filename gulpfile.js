const { watch, src, dest, series } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const rename = require('gulp-rename');
const autoprefixer = require('gulp-autoprefixer');
const fileInclude = require('gulp-file-include');
const beautify = require('gulp-html-beautify');
const svgSprite = require('gulp-svg-sprite');
const cheerio = require('gulp-cheerio');
const minify = require('gulp-uglify');
const image = require('gulp-image');
const browserSync = require('browser-sync').create();

const path = {
    styles: {
        src: './src/scss/**/*.scss',
        dest: './dest/css'
    },
    html: {
        src: './src/html/**/*.html',
        ignore: '!./src/html/sections/*.html',
        dest: './dest'
    },
    js: {
        src: './src/js/*.js',
        dest: './dest/js',
    },
    img: {
        src: './dest/img/**/!(sprite)*.{jpg,png,svg,gif}',
        svg: './dest/img/svg/*.svg',
        dest: './dest/img'
    }
};

// Build SCSS
function styles() {
    return src(path.styles.src)
        .pipe(sass.sync({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(rename({suffix: '.min'}))
        .pipe(dest(path.styles.dest))
        .pipe(browserSync.stream())
}

// Build HTML
function html() {
    return src([path.html.src, path.html.ignore])
        .pipe(fileInclude())
        .pipe(beautify())
        .pipe(dest(path.html.dest))
}

// Build JS
function js() {
    return src(path.js.src)
        .pipe(minify())
        .pipe(rename({suffix: '.min'}))
        .pipe(dest(path.js.dest))
}

// Build SVG Sprite
async function sprite() {
    return src(path.img.svg)
        .pipe(cheerio({
            run: function ($) {
                $('[fill]').each(function() {
                    let $this = $(this);
                    $this.removeAttr('fill');
                    // let fill = $this.attr('fill');
                    // let colors = ['#C2A633', '#F7931A', '#0AC18E', '#3A5D9A', '#26A17B', '#FF060A', '#28B446', '#518EF8', '#F14336', '#FBBB00', '#008DE4']
                    //
                    // if (!colors.includes(fill)) {
                    //     $this.removeAttr('fill');
                    // }
                });
            },
            parserOptions: {xmlMode: true}
        }))
        .pipe(svgSprite({
            mode: {
                symbol: {
                    sprite: '../sprite.svg',
                    inline: true
                }
            }
        }))
        .pipe(dest(path.img.dest));
}

// Compress images
async function compress() {
    src(path.img.src)
        .pipe(image({
            optipng: false,
            pngquant: true,
            zopflipng: false,
            jpegRecompress: false,
            mozjpeg: ['-optimize', '-progressive'],
            gifsicle: true,
            svgo: true,
            concurrent: 10,
            quiet: false
        }))
        .pipe(dest(path.img.dest));
}

// Watcher
function serve() {
    browserSync.init({
        server: {
            baseDir: './dest',
        },
    });
    watch(path.styles.src, styles);
    watch(path.html.src, html).on('change', browserSync.reload);
    watch(path.js.src, js).on('change', browserSync.reload);
}

exports.sprite = sprite;
exports.sass = styles;
exports.html = html;
exports.js = js;
exports.compress = compress;
exports.watch = serve;

exports.default = series(styles, html, js, sprite, compress);
exports.dev = series(styles, html, js);