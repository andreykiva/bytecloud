export const format = (postResults) => {
	const formatedResults = [];

	createSuccessfull(postResults, formatedResults);
	createWrongFormat(postResults, formatedResults);
	createDuplicates(postResults, formatedResults);
	createNotExists(postResults, formatedResults);

	return formatedResults;
};

const createSuccessfull = (arr, formated) => {
	const successfullPatients = arr.patients.filter((item) => !item.formatError && !item.duplicatesError);
	const successfullDoctors = arr.doctors.filter((item) => !item.formatError && !item.duplicatesError);
	const successfullApps = arr.appointments.filter((item) => !item.formatError && !item.existsError);

	if (successfullPatients.length) {
		formated.push({
			title: 'Successfull Patients',
			items: successfullPatients,
		});
	}

	if (successfullDoctors.length) {
		formated.push({
			title: 'Successfull Doctors',
			items: successfullDoctors,
		});
	}

	if (successfullApps.length) {
		formated.push({
			title: 'Successfull Appointments',
			items: successfullApps,
		});
	}
};

const createWrongFormat = (arr, formated) => {
	const wrongPatients = arr.patients.filter((item) => item.formatError);
	const wrongDoctors = arr.doctors.filter((item) => item.formatError);
	const wrongApps = arr.appointments.filter((item) => item.formatError);

	if (wrongPatients.length) {
		formated.push({
			title: 'Wrong Format Patients',
			items: wrongPatients.map((item) => { const { formatError, ...rest } = item; return rest; }),
		});
	}

	if (wrongDoctors.length) {
		formated.push({
			title: 'Wrong Format Doctors',
			items: wrongDoctors.map((item) => { const { formatError, ...rest } = item; return rest; }),
		});
	}

	if (wrongApps.length) {
		formated.push({
			title: 'Wrong Format Appointments',
			items: wrongApps.map((item) => { const { formatError, ...rest } = item; return rest; }),
		});
	}
};

const createDuplicates = (arr, formated) => {
	const wrongPatients = arr.patients.filter((item) => item.duplicatesError);
	const wrongDoctors = arr.doctors.filter((item) => item.duplicatesError);

	if (wrongPatients.length) {
		formated.push({
			title: 'Duplicates Patients',
			items: wrongPatients.map((item) => { const { duplicatesError, ...rest } = item; return rest; }),
		});
	}

	if (wrongDoctors.length) {
		formated.push({
			title: 'Duplicates Doctors',
			items: wrongDoctors.map((item) => { const { duplicatesError, ...rest } = item; return rest; }),
		});
	}
};

const createNotExists = (arr, formated) => {
	const wrongApps = arr.appointments.filter((item) => item.existsError);

	if (wrongApps.length) {
		formated.push({
			title: 'Not exists Appointments',
			items: wrongApps.map((item) => { const { existsError, ...rest } = item; return rest; }),
		});
	}
};
