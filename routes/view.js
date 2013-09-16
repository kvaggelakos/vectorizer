/*********************************************************#
# @@ScriptName: view.js
# @@Author: Konstantinos Vaggelakos<kozze89@gmail.com>
# @@Create Date: 2013-09-11 15:48:39
# @@Modify Date: 2013-09-16 17:00:26
# @@Function:
#*********************************************************/

var fs = require('fs'),
  vectorize = require('./vectorize');

exports.view = function(req, res) {
  var path = vectorize.uploadUrl + req.params.id;
  fs.readdir('public/' + path, function(err, files) {
    if (err) {
      return console.error('There was an error reading the files: ' + err);
    }

    var imageUrls = [];
    files.forEach(function(file) {
      imageUrls.push('/' + path + '/' + file);
    });

    res.render('view', {images: imageUrls});
  });
};

exports.json = function(req, res) {
  var path = vectorize.uploadUrl + req.params.id;
  fs.readdir('public/' + path, function(err, files) {
    if (err) {
      return console.error('There was an error reading the files: ' + err);
    }

    var imageUrls = [];
    files.forEach(function(file) {
      imageUrls.push('http://localhost:3000/' + path + '/' + file);
    });

    res.json({images: imageUrls});
  });
};
