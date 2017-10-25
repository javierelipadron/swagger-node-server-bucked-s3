var express = require('express'),
app = express(),
bodyParser = require('body-parser')



var environment = process.argv[2] || process.env.NODE_ENV || 'dev'

if (environment != 'release' && environment != 'dev') {
  environment = 'dev';
}



//CORS middleware
var allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');

  next();
}


//Config Express
app.use(allowCrossDomain);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Handles put requests


var S3Api = require("./aws-service.js");


//sample : http://localhost:8000/api/swagger/swagger-metro.json

app.get('/api/swagger/:definition', function(request, response){
    
    if (request.params.definition == null) 
        return response.send("Parametro definition no existe");
    
    let keyparser = request.params.definition + ".json";

    params = {Bucket: 'node-swagger-server', Key: keyparser};

        S3Api.getS3File(params, function(error, data) {
            if (error)
                return response.json(error);
            else 
                return response.send(data.Body.toString());
        });

    });

app.listen(9000);
console.log('Express server started on port %s', 9000);