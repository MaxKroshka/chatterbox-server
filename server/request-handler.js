/*************************************************************

You should implement your request handler function in this file.

requestHandler is already getting passed to http.createServer()
in basic-server.js, but it won't work as is.

You'll have to figure out a way to export this function from
this file and include it in basic-server.js so that it actually works.

*Hint* Check out the node module documentation at http://nodejs.org/api/modules.html.

**************************************************************/

var exports = module.exports = {};
var outerOuterStorage = require('./dataRelatedFunction.js');
var outerStorage = outerOuterStorage.dataRelatedFunction();
var url = require('url');

var requestHandler = function(request, response) {
 
  var statusCode = 500;
  var responseResult = '{}';
  var storage = outerStorage;
  var headers = defaultCorsHeaders;

  headers['Content-Type'] = "application/json";

  var verifyUrl = function(url){
    return Boolean(url.match(/classes/));
  };

  if(verifyUrl(request.url)){
    if(request.method === 'GET'){
        console.log('Request was recieved');
        statusCode = 200;
        responseResult = JSON.stringify({results: storage.returnData()});
    }

    if(request.method === 'POST'){
      request.on('data', function(chunk){
        var body = JSON.parse(chunk.toString());
        body.createdAt = Date.now();
        storage.add(body);
      });
      statusCode = 201;
      console.log('Message is succesfully posted');  
    }

    if(request.method === 'OPTIONS'){
      statusCode = 200;
    }
  } else {
    statusCode = 404;
    responseResult = 'Invalid url';
  }
  
  console.log("Serving request type " + request.method + " for url " + request.url);

  response.writeHead(statusCode, headers);
  response.end(responseResult);
};

// These headers will allow Cross-Origin Resource Sharing (CORS).
// This code allows this server to talk to websites that
// are on different domains, for instance, your chat client.
//
// Your chat client is running from a url like file://your/chat/client/index.html,
// which is considered a different domain.
//
// Another way to get around this restriction is to serve you chat
// client from this domain by setting up static file serving.
var defaultCorsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10 // Seconds.
};

exports.requestHandler = requestHandler;

// sneaky way to go around node's "unable to push stuff" restriction
// returns an object  
