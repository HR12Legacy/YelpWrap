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
  		cb(true, newUser);
  	})
  	.catch(err => {
  		cb(false, err)
  	})
	},
	update: (body, cb) => {
		knex.select('*').from('users')
		.returning('homezip')
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
	},
	getZipUsers: (zipcode, cb) => {
		knex.select('*').from('users')
		.where('homezip', zipcode)
		.then(users=> {
			cb(users);
		})
	}
}

module.exports = userController;