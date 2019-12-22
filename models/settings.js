var mongoose =require('mongoose');

var settingsSchema = new mongoose.Schema({
	defaultColor: {
		type: String
	},
	lightColor: {
		type: String
	},
	lightIsOn: {
		type: Boolean
	},
	hotThreshold: {
		type: Number
	},
	coldThreshold: {
		type: Number
	},
	humidThreshold: {
		type: Number
	},
	dryThreshold: {
		type: Number
	},
	darkThreshold: {
		type: Number
	}
});

var Setting = mongoose.model('Setting',settingsSchema);//creates a model out of schema

module.exports =Setting;
