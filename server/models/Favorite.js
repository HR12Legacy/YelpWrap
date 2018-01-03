const db = require('../bookshelf.js');
const User = require('./User.js');

const Favorite = db.Model.extend({
	tableName: 'favorites',
	hasTimestamps: false,
	user: () => {
		this.belongsTo(User, 'userId');
	}
})

module.exports = Favorite;