var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
// var HttpAgent;
// HttpAgent = new XMLHttpRequest();
// HttpAgent.open("GET", "http://localhost:3000/api/data",true);
// HttpAgent.onload  = function() {
// 		   var jsonResponse = JSON.parse(HttpAgent.responseText);
// 		   console.log(jsonResponse[jsonResponse.length-1].temperature);
// 		};
// HttpAgent.send();

// var json = {
//     "lightColor": "000000",
//     "lightIsOn": false
// }
// //HttpAgent = new XMLHttpRequest();
// HttpAgent.open("POST", "http://localhost:3000/api/settings",true);
// HttpAgent.setRequestHeader("Content-type", "application/json");
// HttpAgent.send(JSON.stringify({"lightColor": "000000","lightIsOn": false}));

var xhr = new XMLHttpRequest();
var data = JSON.stringify({"defaultColor": "FF5225",
    "lightColor": "FF0000",
    "lightIsOn": false,
    "coldThreshold": 25,
    "darkThreshold": 5,
    "dryThreshold": 0,
    "hotThreshold": 0,
    "humidThreshold": 5});
console.log(data);
var url = "http://rasp-sensehat.herokuapp.com/api/settings";
xhr.open("PUT", url, true);
xhr.setRequestHeader('Content-Type','application/json; charset=utf-8');
xhr.onload = function () {
	var users = JSON.parse(xhr.responseText);
	if (xhr.readyState == 4 && xhr.status == "200") {
		console.table(users);
		console.log(users.lightColor);
	} else {
		console.error(users);
	}
}

xhr.send(data);

// HttpAgent = new XMLHttpRequest();
// 	HttpAgent.open("PUT", "http://rasp-sensehat.herokuapp.com/api/settings",true);
// 	HttpAgent.setRequestHeader('content-type','application/json');
// 	var body = JSON.stringify({
// 				  "lightColor": "000000"
// 				});
// 	HttpAgent.send(body);
// 	HttpAgent.onload  = function() {
// 			   var jsonResponse = JSON.parse(HttpAgent.responseText);
// 			   var last_item = jsonResponse.lightColor;
// 			   console.log(jsonResponse);
// 			   console.log(last_item);
// 			   // document.getElementById('led').innerHTML = "";
// 			   // document.getElementById('led').innerHTML = last_item;
// 			};
// 			