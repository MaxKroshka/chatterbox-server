var storage = require('./utilities').operateData();
var handleInput = require('./utilities').handleInput;
var handleResponse = require('./utilities').handleResponse;


var methods = {
  'GET': function(request, response){
    var data;
    if(request.url.length > 18){
      data = storage.returnData(request.url); 
    } else {
      data = storage.returnData();
    }
    handleResponse(response, {results: data});
  },
  'POST': function(request, response){
    handleInput(request,function(data){
      storage.add(data);
      handleResponse(response, null, 201);
    });
  },
  'OPTIONS': function(request, response){
    handleResponse(response, null);
  }
};

module.exports = function(request, response) {
  console.log("Serving request type " + request.method + " for url " + request.url);
  var method = methods[request.method];
  if(method){
    method(request,response);    
  }
  else{
    handleResponse(request, 'Not Found', 404);
  }
};
