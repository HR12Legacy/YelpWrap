const db = require('../config.js').db;

const Restaurant = db.Model.extend({
	tableName: 'restaurants',
	hasTimestamps: false
})

module.exports = Restaurant;