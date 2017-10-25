var AWS = require('aws-sdk');
var async = require('async');
var config = require('./config');


// configure the aws sdk
AWS.config.update(
    {
        accessKeyId: config.AWS.ACCESSKEY,
        secretAccessKey: config.AWS.SECRETKEY,
        region: config.AWS.REGION
    }
);


// aws services declarations
var s3 = new AWS.S3();

// query the aws api and expose methods for jobs
module.exports = {

    getS3File : function(params, next) {

        //http://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/requests-using-stream-objects.html

        s3.getObject(params, function(err, data) {
            if (err)
                return next({"error" : err}, null);
        
            return next(null, data);
        }); 
    }


    
}



/* 

s3.listObjects(params, function(err, data){
  payload.list = data.Contents;
  // GET objects in parallel
  async.each(data.Contents, function(file, cb){
    var stream = s3.getObject({Key: file.Key}, function(err, data) {
      payload.objects.push(data.Body.toString());
      cb();
    })
  }, callback);
});

*/