var express =require('express'),
	db      =require('../models'),//includes models folder
	router  =express.Router();
		
var twilio = require('twilio');
var msgtype = '';
function sendsms(msgtype = 'backup'){
// Twilio Credentials
var accountSid = 'ACc76cda42a62d0699bcc96d0613d3b7d9';
var authToken = '35fc6a052d0566aa67388caf9dc0f18c';
// require the Twilio module and create a REST client
var client = new twilio(accountSid, authToken);

var msg = "Code 129";

if (msgtype != 'backup'){
	msg = "Code 129: SOS";
}

client.messages.create({
    to: '+16692927882',
    from: '+15855916460',
    body: msg,
    mediaUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3aBiy9_M3I1iFmCSHygxFcCmRlZtYhJce0GGd53SgUCsbkovs'
})
  .then()
    .catch(function(error) {
      if (error.code === 21614) {
        console.log("Uh oh, looks like this caller can't receive SMS messages.")
      }
    })
    .done()
}

router.get('/',(req,res) => {//Server to client response use get
	var setting;

    db.Settings.findOne({})//find the database
	 .then( function(result) {//result is the data record
 		console.log('settings found >>>>>>>>>>>>>>>>>', result);
		/*const temp = {
			hotThreshold: 1234,
			coldThreshold: 5678,
			humidThreshold:1236666,
			dryThreshold:5456456456,
			lightColor: 'ffffff' 
		} */

		setting = result;
 		return db.Stats.findOne()
 	})
	 .then( function(statResult){
		console.log('Stats found');
		var timeInHot = statResult.timeInHot/statResult.timeTotal;
		var timeInCold = statResult.timeInCold/statResult.timeTotal;
		var timeInHumid = statResult.timeInHumid/statResult.timeTotal;
		var timeInDry = statResult.timeInDry/statResult.timeTotal;
		var timeOn = statResult.timeOn/statResult.timeTotal;

	 	var stats = {
	 		avgTemperature: statResult.avgTemperature.toFixed(2),
	 		avgHumidity: statResult.avgHumidity.toFixed(2),
			avgBrightness: statResult.avgBrightness,
			temperatureData: [timeInHot, 1-timeInHot-timeInCold, timeInCold],
			humidityData: [timeInHumid, 1-timeInHumid-timeInDry, timeInDry],
			onData: [timeOn, 1-timeOn] 
	 	};
	 	console.log(">>>>>>>>>>>>>>>>>", setting);
	 	console.log(stats);
	 	res.render('home', {settings: setting, stats: stats});
	 })
	 .catch(function(err){
	 	res.send(err);
	 });
});

router.get('/details',(req,res) => {
	db.Data.find().limit(24).sort({timestamp: -1})
	.then( function(data) {
		var times = [];
		var temperatures = [];
		var humidities = [];
		var brightnesses = [];

		data.forEach( function(reading) {
			times.push("'" +reading.timestamp+ "'");
			temperatures.push(reading.temperature);
			humidities.push(reading.humidity);
			brightnesses.push(reading.brightness);
		});
		res.render('details', {data: data,
							   temperature: temperatures.reverse(),
							   humidity: humidities.reverse(),
							   brightness:brightnesses.reverse(),
							   times: times 	
		});
	})
	.catch( function(err) {
 		res.send(err);
 	});
 });

router.post('/set-color',(req,res) => {//Client to server response uses post
	 //console.log(req.body.color);
	 //console.log(req.body.options);
	 db.Settings.findOne({})//find the database
	 .then( function(result){//result is the data record
	 var settings = {//set up a key-value pair dictionary
 		'lightColor': req.body.color,
 		'lightIsOn':true
 	}
 	if(req.body.options){
	 		if(req.body.options.setAsDefault){
	 		settings['defaultColor'] = req.body.color;
	 	}else if (req.body.options.changeToDefault){
	 		settings['lightColor'] = result['defaultColor'];
	 	}else if (req.body.options.turnOff || req.body.color == '000000'){
	 		settings['lightColor'] = '000000';
	 		settings['lightIsOn'] = false;
	 	}
    }
    	return db.Settings.findOneAndUpdate({}, settings, {'new': true, upsert: true})
    })
 	//console.log(settings);
 	.then( function(edited) {
 		console.log(edited);
 		res.redirect('/');
 	})
 	.catch( function(err) {
 		res.send(err);
 	});
 });

router.post('/configure',(req,res) =>{
	db.Settings.findOneAndUpdate({}, req.body.setting, {'new': true, upsert: true})
	.then( function(edited) {
 		console.log(edited);
 		res.redirect('/');
 	})
 	.catch( function(err) {
 		res.send(err);
 	});
});

router.get('/seed/:temp/:hum/:bright', (req, res) =>{
	var seed = {
		temperature: req.params.temp,
		humidity: req.params.hum,
		brightness: req.params.bright
	}
	console.log("1:",req.params.temp);
	//console.log("2",seed[temperature]);

	if (req.params.temp >30){
		sendsms();
 		console.log("Backup message send");
	}else if(req.params.bright == 1){
		sendsms("SOS");
		console.log("SOS message send");
	}
	db.Data.create(seed)
	.then( function(newData){
		res.redirect('/details');
	})
	.catch( function(err){
		res.send(err);
	});
});
router.get('/seedStats', (req,res) => {
	var seed = {
		avgTemperature: 32,
		avgHumidity: 11,
		avgBrightness: 721,
		timeInHot: 20,
		timeInCold: 60,
		timeInDry: 80,
		timeInHumid: 8,
		timeOn: 59,
		timeTotal: 100
	}

	db.Stats.findOneAndUpdate({}, seed, {'new': true, upsert: true})
	.then(function(stats){
		console.log(stats);
		res.redirect('/');
	})
	.catch( function(err) {
 		res.send(err);
 	});
});
module.exports = router;
