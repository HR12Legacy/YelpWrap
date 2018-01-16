const restaurantsController = require('./restuarants');
const userController = require('./users');
const searchController = require('./search');

module.exports = {
	user: userController,
	restaurant: restaurantsController,
	search: searchController,
}