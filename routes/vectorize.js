/*********************************************************#
# @@ScriptName: vectorize.js
# @@Author: Konstantinos Vaggelakos<kozze89@gmail.com>
# @@Create Date: 2013-09-11 15:10:01
# @@Modify Date: 2013-09-16 17:03:51
# @@Function:
#*********************************************************/

var fs = require('fs'),
  sh = require('execSync'),
  im = require('imagemagick'),
  crypto = require('crypto');

exports.upload = function(req, res){
  fs.readFile(req.files.displayImage.path, function (err, data) {

    crypto.randomBytes(5, function(ex, buf) {
      var token = buf.toString('hex');

      var newPath = __dirname + '/../public/upload/' + token;

      // Create the directory first
      fs.mkdirSync(newPath);

      // Write the original in that path
      fs.writeFile(newPath + '/' + req.files.displayImage.name, data, function (err) {
        if (err) {
          log.error('Could not complete upload, since we could not write file');
        }

        // First we convert it into bmp, since potrace works with bmp only
        im.convert([newPath + '/' + req.files.displayImage.name, 'BMP3:' + newPath + '/original.bmp'], function(err, stdout) {
          if (err) return console.error(err);

          for (var i = 0; i < 10; i++) {
            sh.run('potrace -o ' + newPath + '/' + i + '.svg' + ' -s -i -k ' + (i/10) + ' ' + newPath + '/original.bmp');
          }

          // Remove the original images
          fs.unlinkSync(newPath + '/original.bmp');
          fs.unlinkSync(newPath + '/' + req.files.displayImage.name);

          res.redirect('/view/' + token + '/json');
        });
      });
    });
  });
};

exports.uploadUrl = 'upload/';
