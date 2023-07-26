const Appointment = require("../models/Appointment");
const Doctor = require("../models/Doctor");
const Patient = require("../models/Patient");
const {
	personSchema,
	appointmentSchema,
	validateWithSchema,
	filterValid,
} = require("../utils/validators");

const createWithModel = async (arr, Model) => {
	try {
		for (let i = 0; i < arr.length; i++) {
			const candidate = await Model.findOne({ id: arr[i].id });

			if (candidate) {
				arr[i].duplicatesError = true;
				continue;
			}

			const instance = new Model(arr[i]);
			await instance.save();
		}
	} catch (e) {
		console.log(e);
	}
};

class AppointmentController {
	async getAllAppointments(req, res) {
		try {
			const appointments = await Appointment.find();

			return res.status(200).json(appointments);
		} catch (e) {
			console.log(e);
		}
	}

	async createAppointments(req, res) {
		const { patients, doctors, appointments } = req.body;

		validateWithSchema(patients, personSchema);
		validateWithSchema(doctors, personSchema);
		validateWithSchema(appointments, appointmentSchema);

		await createWithModel(filterValid(patients), Patient);
		await createWithModel(filterValid(doctors), Doctor);

		const validApps = filterValid(appointments);

		try {
			for (let i = 0; i < validApps.length; i++) {
				const candidatePatient = await Patient.findOne({
					id: validApps[i].patientId,
				});
				const candidateDoctor = await Doctor.findOne({
					id: validApps[i].doctorId,
				});

				if (!candidatePatient || !candidateDoctor) {
					validApps[i].existsError = true;
					continue;
				}

				const newAppointment = new Appointment(validApps[i]);
				await newAppointment.save();
			}
		} catch (e) {
			console.log(e);
		}

		return res.status(200).json({ patients, doctors, appointments });
	}

	async editAppointments(req, res) {
		const editedAppointments = req.body.editedAppointments;

		try {
			for (let i = 0; i < editedAppointments.length; i++) {
				const appointment = await Appointment.findById(editedAppointments[i]._id);

				Object.assign(appointment, editedAppointments[i]);
				await appointment.save();
			}
		} catch (e) {
			console.log(e);
		}

		return res.status(200).json({ message: "Successful"});
	}

	async clearAppointments(req, res) {
		try {
			const removedAppointments = await Appointment.deleteMany({});
			const removedDoctors = await Doctor.deleteMany({});
			const removedPatients = await Patient.deleteMany({});

			const response = {
				appointments: removedAppointments.deletedCount,
				doctors: removedDoctors.deletedCount,
				patients: removedPatients.deletedCount,
			};

			return res.status(200).json(response);
		} catch (e) {
			console.log(e);
		}
	}
}

module.exports = new AppointmentController();
