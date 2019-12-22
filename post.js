// var http = require("http");
// var options = {
//   hostname: 'localhost',
//   port: 3000,
//   path: '/api/settings',
//   method: 'PUT',
//   headers: {
//       'Content-Type': 'application/json',
//   }
// };
// var req = http.request(options, function(res) {
//   console.log('Status: ' + res.statusCode);
//   console.log('Headers: ' + JSON.stringify(res.headers));
//   res.setEncoding('utf8');
//   res.on('data', function (body) {
//     console.log('Body: ' + body);
//   });
// });
// req.on('error', function(e) {
//   console.log('problem with request: ' + e.message);
// });
// // write data to request body
// req.write('{"lightColor": "000000"}');
// req.end();

//{"lightColor": "000000"}

var https = require('https')

var options = {
  "host": "rasp-sensehat.herokuapp.com",
  "path": "/api/settings",
  "method": "PUT",
  "headers": { 
    "Authorization" : "Bearer ",
    "Content-Type" : "application/json",
  }
}

callback = function(response) {
  var str = ''
  response.on('data', function(chunk){
    str += chunk
  })

  response.on('end', function(){
    console.log(str)
  })
}

var body = JSON.stringify({
  "lightColor": "000000"
});
https.request(options, callback).end(body);