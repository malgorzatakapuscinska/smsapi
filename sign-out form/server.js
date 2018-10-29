var express=require('express');
var request=require('request');
var rp=require('request-promise');
var path=require('path');
var cors=require('cors');
var bodyParser = require('body-parser');
var SMSAPI = require('smsapi');

smsapi = new SMSAPI({
  oauth: {
      accessToken: 'b1HYcodZJ0swHqQt25It32EknkSGNBO6X9XurwbU'
  }
});

var app = express();
app.use(bodyParser.json())


app.use(cors({
  'allowedHeaders': ['sessionId', 'Content-Type'],
  'exposedHeaders': ['sessionId'],
  'origin': '*',
  'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
  'preflightContinue': false
}));



app.delete("/contact/delete", function(request, response){
  console.log(request.body);
  function deleteContact() {
    return smsapi.contacts
    .delete(request.body)
  }
})

var server = app.listen(3001, 'localhost', function() {
  var host = server.address().address;
  var port = server.address().port;
  console.log(host);
  console.log(port);
  console.log('Aplikacja nasłuchuje na http://' + host + ':' + port);
});
