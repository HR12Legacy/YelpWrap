const restaurantsController = require('./restuarants');
const userController = require('./users');
const searchController = require('./search');

module.exports = {
	user: userController,
	favorite: restaurantsController,
	search: searchController,
}