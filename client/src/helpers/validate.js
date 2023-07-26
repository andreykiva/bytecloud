const dateReg = /^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d$/;

export const validateUsers = (personString) => {
	const personsArr = personString.split('\n').filter((value) => value != '');
	const validPersons = personsArr.map((person) => {
		let [id, date, name, birth] = person.split(', ');

		if (dateReg.test(name)) {
			const temp = birth;
			birth = name;
			name = temp;
		}

		return {
			id,
			date,
			name,
			birth,
		};
	});

	return validPersons;
};

export const validateAppointments = (appointmentsString) => {
	const appointmentsArr = appointmentsString.split('\n').filter((value) => value != '');
	const validappointments = appointmentsArr.map((appointment) => {
		let [patientId, doctorId, date, ...rest] = appointment.split(', ');

		if (rest.length) date = [date, ...rest].join("");

		return {
			patientId,
			doctorId,
			date,
		};
	});

	return validappointments;
};
