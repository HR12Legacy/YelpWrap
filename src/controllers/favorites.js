const knex = require('../../server/config.js').knex;

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
  },
  retrieve: (body, cb) => {
    knex('favorites').where('userId', body.userId)
    .then((result) => {
      console.log(body.userId)
      console.log(result);
      cb(result);
    })
  }
}

module.exports = favoriteController;