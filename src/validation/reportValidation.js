import Joi from "joi";

const storeReportValidation = Joi.object({
	latitude: Joi.string().required(),
	longitude: Joi.string().required(),
	description: Joi.string().required(),
});

export { storeReportValidation };
