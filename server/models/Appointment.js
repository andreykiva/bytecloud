const { Schema, model } = require("mongoose");

const Appointment = new Schema({
	patientId: {
		type: Number,
		required: true,
	},
	doctorId: {
		type: Number,
		required: true,
	},
	date: {
		type: Number,
		required: false,
	},
});

module.exports = model("Appointment", Appointment);
