var mongoose =require('mongoose'),//tool used to interact with mongodb
	dotenv   =require('dotenv');//helps to create local env variable

dotenv.load();//load .env files
/******Checks If it reads .env files ***/
/*const result = dotenv.config()

if (result.error) {
  throw result.error
}

console.log(result.parsed);
mongoose.set('debug',true);*/
console.log('>>>>>>>>>>>>>>>>>>', process.env.DATABASE);
mongoose.connect(process.env.DATABASE, { useNewUrlParser: true });//uses database in .env
//console.log(process.env.DATABASE);
mongoose.promise = Promise;//specific syntax to make code cleaner

module.exports.Settings = require('./settings');//contains the schema
module.exports.Stats = require('./statitics');
module.exports.Data = require('./data');