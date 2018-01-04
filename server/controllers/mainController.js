const favoriteController = require('./favorites');
const userController = require('./users');
const searchController = require('./search');

module.exports = {
	user: userController,
	favorite: favoriteController,
	search: searchController,
}