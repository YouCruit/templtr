# gulp-templtr

> templtr plugin for [gulp](https://github.com/wearefractal/gulp)

## Usage

First, install `gulp-templtr` as a development dependency:

```shell
npm install --save-dev gulp-templtr
```

Then, add it to your `gulpfile.js`:

```javascript
var templtr = require("gulp-templtr");

gulp.src("./src/*.ext")
	.pipe(templtr())
	.pipe(gulp.dest("./dist"));
});
```

## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)