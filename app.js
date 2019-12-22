var express    =require('express'),//use library express
	bodyParser =require('body-parser'), 
	app	       =express();//initialize server

var indexRoutes = require('./routes/index'),
	apiRoutes   = require('./routes/api');

	app.set('port',(process.env.PORT || 3000));//define a port
	app.set('view engine', 'ejs');//search for views
	app.use(express.static(__dirname + '/assets'));//search for css & js in assets
	app.use(bodyParser.json());//use body-paser
	app.use(bodyParser.urlencoded({extended: true}));

 /******** ROUTES ********/
 app.use('/', indexRoutes);//make use of router function exported from index.js
 app.use('/api', apiRoutes);
//turns the app on and listens to requests
app.listen(app.get('port'),() => console.log('Listening on port' + app.get('port')));

