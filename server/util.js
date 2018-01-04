const bcrypt = require('bcrypt');
const User = require('./models/User.js');

module.exports = {
	isAuthenticated: (req, res, next) => {
	},

	validateLogin: (req, res) => {
		new User({ username: req.body.username }).fetch()
		.then(user => {
			if(user) {
				user.comparePassword(req.body.password, (match) => {
					if (match) {
						// SET SESSION
					} else {
						res.status(410).send({message: "invalid"})
					}
				})
			}
		})
	}
}