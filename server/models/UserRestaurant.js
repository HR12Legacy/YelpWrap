const db = require('../config.js').db;
const User = require('./User.js');

const UserRestaurant = db.Model.extend({
	tableName: 'userRestaurants',
  hasTimestamps: false,
  userId: () => {
    return this.belongsTo(User, 'id');
  }
})

module.exports = UserRestaurant;