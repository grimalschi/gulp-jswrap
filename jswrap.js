var through = require('through2');
var gutil = require('gulp-util');
var jswrap = require('jswrap');
var PluginError = gutil.PluginError;

var gulpJswrap = function (catchbody, module) {
    var stream = through.obj(function(file, enc, cb) {
        if (file.isStream()) {
            this.emit('error', new PluginError('gulp-jswrap', 'Streams are not supported`!'));
            return cb();
        }

        if (file.isBuffer()) {
            var str = file.contents.toString('utf8');
            file.contents = new Buffer(jswrap(str, catchbody, module));
        }

        this.push(file);

        cb();
    });

    return stream;
};

gulpJswrap.code = jswrap;

module.exports = gulpJswrap;