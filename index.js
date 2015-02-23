var through = require("through2"),
	gutil = require("gulp-util");

module.exports = function () {
	"use strict";

	var output = {};

	function templtr(file, enc, callback) {
		/*jshint validthis:true*/
		var fileName,
			filePath;

		if (file.isNull()) {
			this.push(file);
			return callback();
		}

		if (file.isStream()) {
			this.emit("error",
				new gutil.PluginError("gulp-templtr", "Stream content is not supported"));

			return callback();
		}

		if (file.isBuffer()) {
			filePath = file.path;
			fileName = filePath.substring(filePath.lastIndexOf("/") + 1, filePath.lastIndexOf("."));
			output[fileName] = String(file.contents);
		}
		return callback();
	}

	return through.obj(templtr, function(callback) {
		var file = new gutil.File({
		 	path: "tpl.js",
			contents: new Buffer(JSON.stringify(output))
		});
		this.push(file);
		callback();
	});
};
