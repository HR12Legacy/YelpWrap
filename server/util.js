const bcrypt = require('bcrypt');
const User = require('./models/User.js');
const validator = require('validator');

module.exports = {
	isAuthenticated: (req, res, next) => {
	},

	validateLogin: (req, res) => {
		new User({ email: req.body.email }).fetch()
		.then(user => {
			if(user) {
				user.comparePassword(req.body.password, (match) => {
					console.log(match)
					if (match) {
						res.status(200).send(match);
					} else {
						console.log('helo')
						res.status(410).send({message: "invalid"})
					}
				})
			}
		})
	}, 
	
	validateSignupForm: (payload) => {
	  const errors = {};
	  let isFormValid = true;
	  let message = '';

	  if (!payload || typeof payload.email !== 'string' || !validator.isEmail(payload.email)) {
	    isFormValid = false;
	    errors.email = 'Please provide a correct email address.';
	  }

	  if (!payload || typeof payload.password !== 'string' || payload.password.trim().length < 8) {
	    isFormValid = false;
	    errors.password = 'Password must have at least 8 characters.';
	  }

	  if (!payload || typeof payload.name !== 'string' || payload.name.trim().length === 0) {
	    isFormValid = false;
	    errors.name = 'Please provide your name.';
	  }

	  if (!isFormValid) {
	    message = 'Check the form for errors.';
	  }

	  return {
	    success: isFormValid,
	    message,
	    errors
	  };
	},

	validateLoginForm: (payload) => {
	  const errors = {};
	  let isFormValid = true;
	  let message = '';

	  if (!payload || typeof payload.email !== 'string' || payload.email.trim().length === 0 || !validator.isEmail(payload.email)) {
	    isFormValid = false;
	    errors.email = 'Please provide your email address.';
	  }

	  if (!payload || typeof payload.password !== 'string' || payload.password.trim().length === 0) {
	    isFormValid = false;
	    errors.password = 'Please provide your password.';
	  }

	  if (!isFormValid) {
	    message = 'Check the form for errors.';
	  }

	  return {
	    success: isFormValid,
	    message,
	    errors
	  };
	}
}