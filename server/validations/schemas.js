const Joi = require('joi');

const schemas = {
	auth: {
		body: {
			name: Joi.string().alphanum().min(3).max(30).required(),
			password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required()
		}
	},
	register: {
		body: {
			name: Joi.string().alphanum().min(3).max(30).required(),
			password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
			age: Joi.number().integer().min(18).max(80),
			occupation: Joi.string().alphanum().min(0).max(30)
		}
	},
	locations: {
		body: {
			"token": [Joi.string(), Joi.number()],
			"id": [Joi.string(), Joi.number()],
			"userId": [Joi.string(), Joi.number()],
			"data": {
				"name": Joi.string().alphanum().min(3).max(30),
				"type": Joi.string().alphanum().min(3).max(30),
				"lat": Joi.number(),
				"lng": Joi.number()
			}
		}
	},
	users: {
		body: {
			token: [Joi.string(), Joi.number()],
			name: Joi.string().alphanum().min(3).max(30),
			age: Joi.number().integer().min(18).max(80),
			occupation: Joi.string().alphanum().min(3).max(30)
		}
	}
};

module.exports = schemas;
