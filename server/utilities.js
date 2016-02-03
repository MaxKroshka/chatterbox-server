var fs = require('fs');
var url = require('url');
var headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  "Content-Type": "application/json"
};

module.exports.operateData = function() {
  var dataObject = {};
  var objectId = 0;
  var data = JSON.parse(fs.readFileSync('/Users/student/Desktop/2016-01-chatterbox-server/server/messages.json', 'utf8'));
  dataObject.add = function(value) {
    value.objectId = ++objectId;
    value.createdAt = Date.now();
    data.push(value);
    fs.writeFile('/Users/student/Desktop/2016-01-chatterbox-server/server/messages.json', JSON.stringify(data));
  };
  dataObject.returnData = function(passedUrl) {
    if(!passedUrl){
      return data;
    } else {
      var urlQuery = url.parse(passedUrl).query;
      var newData = data.slice();
      if(urlQuery.match(/order=-createdAt/)){
        newData.sort(function(a,b){
          return b.createdAt - a.createdAt;
        });
      }
      if(urlQuery.match(/limit=/)){
        var limit = +passedUrl.slice(passedUrl.match(/limit=/).index+6);
        newData = newData.slice(0,limit);
      }
      return newData;
    }
  };

  return dataObject;
};

module.exports.handleResponse = function(response, data, statusCode, contentType){
  // if(contentType){
  //   headers['Content-Type'] = contentType;
  // } else {
  //   headers['Content-Type'] = "application/json";
  // }
  statusCode = statusCode || 200;
  response.writeHead(statusCode, headers);
  response.end(JSON.stringify(data));
};

module.exports.handleInput = function(request,callback){
  var body = "";
  request.on('data', function(chunk){
    body += chunk;
  });
  request.on('end', function(){  
    callback(JSON.parse(body));
  });
};
