get-iam-creds
================

#### This is a tiny module to fetch IAM creds from IMD and pass to awssum.

If you're running inside EC2, you can use instance metadata (IMD)
to fetch temporary credentials from IAM, instead of keeping secrets
inside your EC2 instances.

This module does that, and returns the creds in the format expected
by awssum: ```{ accessKeyId, secretAccessKey, token }```.

Note: fetching the region is kinda brittle, so you may optionally pass
the region in as the second argument. If it's not passed in, then we'll
get the availability zone from IMD, shave off the last char, and use that.
If you only use one region, there's no need to do that API hit anyway.

## Example.
### before:

    new CloudWatch({accessKeyId: 'foo', secretAccessKey: 'bar', region: 'baz'})

### after: 

    var getIamCreds = require('get-iam-creds');
    getIamCreds(function(err, creds) { new CloudWatch(creds) });

#### or, in single region installs:

    getIamCreds(function(err, creds) { new CloudWatch(creds) }, 'us-west-2');
