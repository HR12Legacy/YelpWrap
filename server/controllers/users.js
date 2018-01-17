const knex = require('../../server/config.js').knex;
const User = require('../models/User.js');

const userController = {
  add: (body, cb) => {
  	const newUser = new User({
  		email: body.email,
      name: body.name,
  		password: body.password,
  	})
  	newUser.save()
  	.then(newUser => {
  		cb(newUser);
  	})
  	.catch(err => {
  		console.error(err)
  	})
	},
	update: (body, cb) => {
		knex.select('*').from('users')
		.where('email', body.email)
		.update(body)
		.then(updatedUser=> {
			cb(updatedUser)
		})
		.catch(err=> {
			console.error(err)
		})
	},
	getUser: (id, cb) => {
		knex.select('*').from('users')
		.where('id', id)
		.then(user=> {
			cb(user);
		})
	}
}

module.exports = userController;