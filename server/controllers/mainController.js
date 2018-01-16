const favoriteController = require('./favorites');
const userController = require('./users');
const searchController = require('./search');
const messageController = require('./messages.js');
const ziproomController = require('./ziproom.js');

module.exports = {
	user: userController,
	favorite: favoriteController,
	search: searchController,
  message: messageController,
  ziproom: ziproomController
}