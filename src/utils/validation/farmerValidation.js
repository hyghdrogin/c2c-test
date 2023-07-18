import Joi from "joi";

const options = {
	stripUnknown: true,
	abortEarly: false,
	errors: {
		wrap: {
			label: ""
		}
	}

};

const validateFarmer = (create) => {
	const createFarmer = Joi.object({
		first_name: Joi.string().min(5).max(50).required(),
		last_name: Joi.string().min(5).max(50).required(),
		phone_number: Joi.string().min(5).max(20).required(),
		age: Joi.number().required(),
		address: Joi.string().min(6).max(100).required(),
		crops: Joi.string().min(6).max(100).required()
	});
	return createFarmer.validate(create, options);
};


export {
	validateFarmer
};