const knex = require('../../server/config.js').knex;
const User = require('../models/User.js');

const userController = {
  add: (body, cb) => {
  	console.log('adding')
  	const newUser = new User({
  		username: body.username,
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