const knex = require(knex)({
	client: 'pg',
	connection: {
		user: 'root',
		password: '',
		database: 'yelpwrap'
	}
});

knex.schema.hasTable('users', (exists) => {
	if (!exists) {
		knex.schema.createTable('users'.then(table => {
			table.increments('id').primary();
			table.string('username', 255);
		}).then(table => {
			console.log('Created table:', table);
		})
	}
});

knex.schema.hasTable('favorites').then(exists => {
	if(!exists) {
		knex.schema.createTable('favorites', (table) => {
			table.increments('id').primary();
			table.integer('userId');
			table.string('url', 255);
			table.string('name', 255);
			table.string('phone', 16);
			table.string('address', 255);
		}).then(table => {
			console.log('Created table:', table);
		})
	}
})


const bookshelf = require('bookshelf')(knex);

module.exports = bookshelf;