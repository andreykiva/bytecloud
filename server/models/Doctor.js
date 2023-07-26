const { Schema, model } = require('mongoose');

const Doctor = new Schema({
	id: {
		type: Number,
		required: true
	},
	date: {
		type: String,
		required: true
	},
	name: {
		type: String,
		required: false
	},
	birth: {
		type: String,
		required: false
	}
});

module.exports = model('Doctor', Doctor);
