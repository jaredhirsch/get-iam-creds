// TODO are we catching *all* the errors?
// TODO unit tests--maybe need a set of fake responses from awssum?
var Imd = require('awssum-amazon-imd').Imd;
module.exports = function getIamCreds(cb, region) {
  var imd = new Imd(),
    creds = {};
  imd.Get({Version: 'latest', Category: '/meta-data/iam/security-credentials/' }, function(err, data) {
    if (err) return cb(err);
    var role = data.Body;
    imd.Get({Version: 'latest', Category: '/meta-data/iam/security-credentials/' + role}, function(err, data) {
      if (err) return cb(err);
      var parsed = JSON.parse(data.Body);
      creds = {
        accessKeyId: parsed.AccessKeyId,
        secretAccessKey: parsed.SecretAccessKey,
        token: parsed.Token
      };
      imd.Get({Version: 'latest', Category: '/dynamic/instance-identity/document'}, function(err, data) {
        if (err) return cb(err); 
        creds.region = JSON.parse(data.Body).region;
        cb(null, creds);
      });
    });
  });
};
