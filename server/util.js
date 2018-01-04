const bcrypt = require('bcrypt');
const User = require('./models/User.js');

module.exports = {
	isAuthenticated: (req, res, next) => {
	},

	validateLogin: (req, res) => {
		new User({ username: req.body.email }).fetch()
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
	}
}