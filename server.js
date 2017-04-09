var http = require("http");
var fs  = require("fs");

var server = http.createServer(function(req,res){
  if(req.url==="/"){
    fs.readFile('./views/index.html', function(err,content){
      res.writeHead(200, {"Content-type":"text/html"});
      res.write(content);
      res.end();
    })
  }
  if(req.url==="/index.js"){
    fs.readFile('./assets/index.js', function(err,content){
      res.writeHead(200, {"Content-type":"text/html"});
      res.write(content);
      res.end();
    })
  }
});
server.listen(8000);
