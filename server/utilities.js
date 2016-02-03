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
  var data = [
     {
      username: "Test",
      text: "initial message",
      roomname: 'lobby',
      createdAt: Date.now(),
      objectId: 0
    }
  ];

  dataObject.add = function(value) {
    value.objectId = ++objectId;
    value.createdAt = Date.now();
    data.push(value);
  };
  dataObject.returnData = function(url) {
    if(!url){
      return data;
    } else {
      var newData = data.slice();
      if(url.match(/order=-createdAt/)){
        newData.sort(function(a,b){
          return b.createdAt - a.createdAt;
        });
      }
      if(url.match(/limit=/)){
        var limit = +url[url.match(/limit=/).index+6];
        newData = newData.slice(0,limit);
      }
      return newData;
    }
  };

  return dataObject;
};

module.exports.handleResponse = function(response, data, statusCode){
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
