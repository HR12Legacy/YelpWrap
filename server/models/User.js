const db = require('../bookshelf.js')

const User = db.Model.extend({
	tableName: 'users',

})

module.exports = User;