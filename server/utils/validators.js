const Joi = require("joi");

const personSchema = Joi.object({
	id: Joi.number().required(),
	date: Joi.string()
		.pattern(/^\d{1,2}-\d{1,2}$/)
		.custom((value, helpers) => {
			const [num1, num2] = value.split("-");
			if (
				parseInt(num1) >= 0 &&
				parseInt(num1) <= 23 &&
				parseInt(num2) > parseInt(num1) &&
				parseInt(num2) <= 24
			) {
				return value;
			} else {
				return helpers.message(
					'Invalid date range. The format should be "num1-num2" with numbers less than 25.'
				);
			}
		})
		.required()
		.messages({
			"string.pattern.base":
				'Invalid date format. The format should be "num1-num2".',
		}),
	name: Joi.string()
		.regex(/^[a-zA-Z]+(?: [a-zA-Z]+)?$/)
		.optional()
		.messages({
			"string.pattern.base":
				"Invalid name format. The format should be one or two words separated by a space.",
		}),
	birth: Joi.string()
		.pattern(/^\d{2}\.\d{2}\.\d{4}$/)
		.optional()
		.messages({
			"string.pattern.base":
				'Invalid birth date format. The format should be "DD.MM.YYYY".',
		}),
});

const appointmentSchema = Joi.object({
	patientId: Joi.number().required(),
	doctorId: Joi.number().required(),
	date: Joi.number().max(24).required().messages({
		"number.max": "Date should be less than or equal to 24",
		"number.base": "Date should be a number",
	}),
});

const validateWithSchema = (arr, schema) => {
	arr.forEach((item) => {
		const { error } = schema.validate(item, { abortEarly: false });

		if (error) {
			item.formatError = true;
		}
	});
};

const filterValid = (arr) => {
	return arr.filter(item => !item.formatError);
}

module.exports = { personSchema, appointmentSchema, validateWithSchema, filterValid };
