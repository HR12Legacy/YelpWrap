const bookshelf = require('../config.js').db
var bcrypt = require('bcrypt');
var Promise = require('bluebird');
const Message = require('./Message.js')

const User = bookshelf.Model.extend({
	tableName: 'users',
	initialize: function() {
		this.on('creating', this.hashPassword);
	},
	comparePassword: function(input, cb) {
		bcrypt.compare(input, this.get('password'), (err, match) => {
			cb(match);
		});
	},
	hashPassword: function() {
		const hasher = Promise.promisify(bcrypt.hash);
		return hasher(this.get('password'), 10).bind(this)
			.then(hash => {
				this.set('password', hash);
			})
			.catch(err => console.log(err))

	},
	messages: function() {
		return this.hasMany(Message)
	}
})

module.exports = bookshelf.model('User', User);