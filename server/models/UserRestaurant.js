const db = require('../config.js').db;
const User = require('./User.js');

const UserRestaurant = db.Model.extend({
	tableName: 'user_restaurants',
  hasTimestamps: false,
  userId: () => {
    return this.belongsTo(User, 'id');
  },
  restaurantId: () => {
    return this.belongsTo(Restaurant, 'id');
  }
})

module.exports = UserRestaurant;