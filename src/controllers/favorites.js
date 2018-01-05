const knex = require('../../server/bookshelf.js').knex;

const favoriteController = {
  add: (body, cb) => {
    knex('favorites').insert({
      userId: body.userId,
      url: body.url,
      name: body.name,
      phone: body.phone,
      address: body.address
    }).then(() => {
      cb();
    })
  }
}

module.exports = favoriteController;