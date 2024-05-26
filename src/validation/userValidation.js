import Joi from "joi";

const userRegisterValidation = Joi.object({
	email: Joi.string().email().max(100).required(),
	name: Joi.string().max(50).required(),
	password: Joi.string().min(6).required(),
	password_confirmation: Joi.string().min(6).required(),
})
	.custom((value, helpers) => {
		if (value.password !== value.password_confirmation) {
			return helpers.error("pass.different");
		}
		return value;
	})
	.message({
		"pass.different": "Password and password confirmation has different value",
	});

const userLoginValidation = Joi.object({
	email: Joi.string().email().max(100).required(),
	password: Joi.string().min(6).required(),
});

const userUpdateValidation = Joi.object({
	email: Joi.string().email().max(100),
	name: Joi.string().max(50),
	address: Joi.string().max(50),
});

const changePasswordValidation = Joi.object({
	password: Joi.string().min(6).required(),
	password_confirmation: Joi.string().min(6).required(),
})
	.custom((value, helpers) => {
		if (value.password !== value.password_confirmation) {
			return helpers.error("password.different");
		}
		return value;
	})
	.messages({
		"password.different":
			"Password and password confirmation has different value",
	});

export {
	userRegisterValidation,
	userLoginValidation,
	userUpdateValidation,
	changePasswordValidation,
};
