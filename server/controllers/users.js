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
  }
}

module.exports = userController;