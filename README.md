awssum-iam-creds
================

## Tiny module to fetch IAM creds from IMD and pass to awssum.

If you're running inside EC2, you can use instance metadata (IMD)
to fetch temporary credentials from IAM. This does that, and returns
the creds in the format expected by awssum: { accessKeyId, secretAccessKey, token }.

note: fetching the region is quite brittle, so you may optionally pass
the region in as the second argument. if it's not passed in, then we'll
shave the last char off the availability zone listed in IMD, and use that.
if you only use one region, that's simplest anyway.

## Example.
### before:

    new CloudWatch({accessKeyId: 'foo', secretAccessKey: 'bar', region: 'baz'})

### after: 

    var getIamCreds = require("./credentials.js");
    getIamCreds(function(err, creds) { new CloudWatch(creds) });

#### or, in single region installs:

    getIamCreds(function(err, creds) { new CloudWatch(creds) }, 'us-west-2');

