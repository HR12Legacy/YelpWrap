const knex = require('../../server/config.js').knex;

const favoriteController = {
  add: (body, cb) => {
    knex('favorites').insert({
      userId: body.userId,
      url: body.url,
      name: body.name,
      phone: body.phone,
      address: body.address,
      img_url: body.img_url,
      location: JSON.stringify(body.location)
    }).then(() => {
      cb();
    })
  },
  retrieve: (body, cb) => {
    knex('favorites').where('userId', body.userId)
    .then((result) => {
      result.location = JSON.parse(result.location);
      cb(result);
    })
  }
}

module.exports = favoriteController;