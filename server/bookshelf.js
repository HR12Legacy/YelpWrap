const knex = require(knex)({
	client: 'pg',
	connection: {
		user: 'root',
		password: '',
		database: 'yelpwrap'
	}
});

const bookshelf = require('bookshelf')(knex);

module.exports = bookshelf;