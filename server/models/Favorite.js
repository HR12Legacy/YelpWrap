const db = require('../config.js').db;
const User = require('./User.js');

const Favorite = db.Model.extend({
	tableName: 'favorites',
	hasTimestamps: false,
	userId: () => {
		return this.belongsTo(User, 'id');
	}
})

module.exports = Favorite;