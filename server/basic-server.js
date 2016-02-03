/* Import node's http module: */
var http = require("http");
var handleRequest = require("./request-handler");
var fs = require('fs');
var url = require('url');
var handleResponse = require('./utilities').handleResponse;
// Every server needs to listen on a port with a unique number. The
// standard port for HTTP servers is port 80, but that port is
// normally already claimed by another server and/or not accessible
// so we'll use a standard testing port like 3000, other common development
// ports are 8080 and 1337.
var port = 3000;

// For now, since you're running this server on your local machine,
// we'll have it listen on the IP address 127.0.0.1, which is a
// special address that always refers to localhost.
var ip = "127.0.0.1";



// We use node's http module to create a server.
//
// The function we pass to http.createServer will be used to handle all
// incoming requests.
//
// After creating the server, we will tell it to listen on the given port and IP. */
fs.readFile(__dirname+"/index.html", function(err, html){
var server = http.createServer(function(request, response){
  var urlParts = url.parse(request.url);

  if(urlParts.pathname === '/'){ 
    fs.readFile(__dirname+"/index.html", function(err, data){
      response.writeHead(200, {'Content-Type': 'text/html'});
      response.write(data);
      response.end();
    });
  }
  else if(urlParts.pathname ===  '/env/config.js') {
   fs.readFile(__dirname+"/env/config.js", function(err, data){
      response.writeHead(200, {'Content-Type': 'application/javascript'});
      response.write(data);
      response.end();
    }); 
  }
  else if(urlParts.pathname ===  '/scripts/app.js') {
   fs.readFile(__dirname+"/scripts/app.js", function(err, data){
      response.writeHead(200, {'Content-Type': 'application/javascript'});
      response.write(data);
      response.end();
    }); 
  }
  else if(urlParts.pathname ===  '/styles/styles.css') {
   fs.readFile(__dirname+"/styles/styles.css", function(err, data){
      response.writeHead(200, {'Content-Type': 'text/css'});
      response.write(data);
      response.end();
    }); 
  }
  else if(urlParts.pathname ===  '/images/spiffygif_46x46.gif') {
   fs.readFile(__dirname+"/images/spiffygif_46x46.gif", function(err, data){
      response.writeHead(200, {'Content-Type': 'image/gif'});
      response.write(data);
      response.end();
    }); 
  }
  else if(urlParts.pathname === '/classes/chatterbox'){
    handleRequest(request,response);
  } else {
    handleResponse(response, 'Not Found', 404);
  }
});
console.log("Listening on http://" + ip + ":" + port);
server.listen(port, ip);
});
// To start this server, run:
//
//   node basic-server.js
//
// on the command line.
//
// To connect to the server, load http://127.0.0.1:3000 in your web
// browser.
//
// server.listen() will continue running as long as there is the
// possibility of serving more requests. To stop your server, hit
// Ctrl-C on the command line.
