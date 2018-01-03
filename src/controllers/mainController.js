const favoriteController = require('./favorites');
const userController = require('./users');

module.exports = {
	user: userController,
	favorite: favoriteController,
}