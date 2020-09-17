const express = require("express");
const app = express();

app.use(express.static(__dirname + '/public/'));
app.get("/", function(req, res){
  res.sendFile(__dirname+"/public/index.html");
});

app.get("/jobApp", function(req, res){
  res.sendFile(__dirname+"/public/art.html");
});

app.listen(4000, function() {
  console.log("Server started on port 4000");
});