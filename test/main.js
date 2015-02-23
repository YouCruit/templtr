/*global describe, it*/
"use strict";

var fs = require("fs"),
	should = require("should");

require("mocha");

delete require.cache[require.resolve("../")];

var gutil = require("gulp-util"),
	templtr = require("../");

describe("gulp-templtr", function () {

	var expectedFile = new gutil.File({
		path: "test/expected/buffer.js",
		cwd: "test/",
		base: "test/expected",
		contents: fs.readFileSync("test/expected/buffer.js")
	});

	it("should produce expected file via buffer", function (done) {

		var srcFile = new gutil.File({
			path: "test/fixtures/file1.html",
			cwd: "test/",
			base: "test/fixtures",
			contents: fs.readFileSync("test/fixtures/file1.html")
		});

		var stream = templtr(srcFile);

		stream.on("error", function(err) {
			should.exist(err);
			done(err);
		});

		stream.on("data", function (newFile) {

			should.exist(newFile);
			should.exist(newFile.contents);

			String(newFile.contents).should.equal(String(expectedFile.contents));
			done();
		});

		stream.write(srcFile);
		stream.end();
	});
});
