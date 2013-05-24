get-iam-creds
================

#### This is a tiny module to fetch IAM creds from IMD and pass to awssum.

If you're running inside EC2, you can use instance metadata (IMD)
to fetch temporary credentials from IAM, instead of keeping secrets
inside your EC2 instances.

This module does that, and returns the creds in the format expected
by awssum: ```{ accessKeyId, secretAccessKey, token }```.

## Example.
### before:

    new CloudWatch({accessKeyId: 'foo', secretAccessKey: 'bar', region: 'baz'})

### after: 

    var getIamCreds = require('get-iam-creds');
    getIamCreds(function(err, creds) { new CloudWatch(creds) });
