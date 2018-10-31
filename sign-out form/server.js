const express=require('express');
const request=require('request');
const rp=require('request-promise');
const path=require('path');
const cors=require('cors');
const bodyParser = require('body-parser');
const SMSAPI = require('smsapi');

smsapi = new SMSAPI({
  oauth: {
      accessToken: 'b1HYcodZJ0swHqQt25It32EknkSGNBO6X9XurwbU'
  }
});

const app = express();
app.use(bodyParser.json())
app.use('/static', express.static(path.join(__dirname, 'public')))

app.use(cors({
  'allowedHeaders': ['sessionId', 'Content-Type'],
  'exposedHeaders': ['sessionId'],
  'origin': '*',
  'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
  'preflightContinue': false
}));



app.post("/contact/delete", function(request, response){
  let contactId = '';
  console.log(request.body);
  function getContactIdandDelete() {
    return smsapi.contacts
    .list()
    .phoneNumber(request.body.phone_number)
    .execute()
    .then(function(result) {
        console.log(result.size)
        console.log(result.collection);

      if (result.size !== 0) {
        console.log(result.collection[0].id)
        contactId = result.collection[0].id;
        console.log('I am your id: ' + contactId);
        contactDelete(contactId);
      } else response.send('Contact not found')
    })

  }
  function contactDelete(number) {
    console.log("contact id to remove")
    console.log(number);
    return smsapi.contacts
    .delete(number)
    .execute()
    .then(function(result) {
      response.send('contact sucessfully deleted');
    })
    .catch(function(error) {
      response.send("Error encountered")
    })
  }
  getContactIdandDelete();
})

var server = app.listen(3001, 'localhost', function() {
  var host = server.address().address;
  var port = server.address().port;
  console.log(host);
  console.log(port);
  console.log('Aplikacja nasłuchuje na http://' + host + ':' + port);
});
