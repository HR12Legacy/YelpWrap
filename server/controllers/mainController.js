const restaurantsController = require('./restaurants');
const userController = require('./users');
const searchController = require('./search');
const messageController = require('./messages.js');
const ziproomController = require('./ziproom.js');

module.exports = {
	user: userController,
	favorite: restaurantsController,
	search: searchController,
  message: messageController,
  ziproom: ziproomController
}