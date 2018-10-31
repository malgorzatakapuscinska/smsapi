const express=require('express');
const request=require('request');
const rp=require('request-promise');
const path=require('path');
const cors=require('cors');
const bodyParser = require('body-parser');
const { check, validationResult } = require('express-validator/check');
var SMSAPI = require('smsapi');

smsapi = new SMSAPI({
  oauth: {
      accessToken: 'b1HYcodZJ0swHqQt25It32EknkSGNBO6X9XurwbU'
  }
});

const app = express();
app.use(bodyParser.json())


app.use(cors({
  'allowedHeaders': ['sessionId', 'Content-Type'],
  'exposedHeaders': ['sessionId'],
  'origin': '*',
  'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
  'preflightContinue': false
}));

app.post('/validation', function(request, response) {
  console.log(request.body);
  console.log(request.body.phone_number)
  let checkResults = {};
  function validateEmailandPhone() {
    return smsapi.contacts
    .list()
    .phoneNumber(request.body.phone_number)
    .execute()
    .then(function(result) {
      console.log("first request result")
      console.log(result);
      console.log(result.size);
      if (result.size !== 0) {
          checkResults.phone_number = 'exists';
          console.log(checkResults);
          isEmailExist();
      }
      else {
        checkResults.phone_number = 'ok';
        isEmailExist();
      }
    })
    .catch(function(error) {
      console.log(error);
      response.send('500 Internal Server Error');
    })
  }

  console.log(request.body);
  console.log(request.body.email);

  function isEmailExist () {
    return smsapi.contacts
    .list()
    .email(request.body.email)
    .execute()
    .then(function(result) {
      console.log('Second request result')
      console.log(result);
      if (result.size !== 0) {
        checkResults.email = 'exists';
        console.log(checkResults);
        response.send(checkResults);
        }
      else {
        checkResults.email = 'ok';
        console.log(checkResults)
        response.send(checkResults);
      }
    })
    .catch(function(error) {
      console.log(error);
      response.send('500 Internal Server Error');
    })
  }

  validateEmailandPhone();
})

app.get("/groups", function(request, response){
  function getContactsGroups() {
    return smsapi.contacts.groups
    .list()
    .execute()
    .then(function(result) {
      console.log(result);
      response.send(result.collection);
    })
    .catch(function(error) {
      console.log(error);
      response.send("404 not found")
    })
  }
  getContactsGroups();
});

app.post("/contacts/add", function(request, response) {
  console.log(request.body);
  function addContact() {
    return smsapi.contacts
    .add()
    .params(request.body)
    .execute()
    .then(function(result) {
      console.log(result);
      response.send("Data saved correct");
    })
    .catch(function(error) {
      response.send('500 Internal Server Error');
      console.log(error.message);
    })
  }

  addContact();
});


var server = app.listen(3001, 'localhost', function() {
  var host = server.address().address;
  var port = server.address().port;
  console.log(host);
  console.log(port);
  console.log('Aplikacja nasłuchuje na http://' + host + ':' + port);
});
