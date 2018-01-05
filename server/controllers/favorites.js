const knex = require('../../server/config.js').knex;

const favoriteController = {
  add: (body, cb) => {
    knex('favorites').insert({
      userId: body.userId,
      url: body.url,
      name: body.name,
      phone: body.phone,
      display_address: body.address,
      image_url: body.img_url,
      location: body.location,
      display_address: body.display_address,
    }).then(() => {
      cb();
    })
  },
  retrieve: (body, cb) => {
    knex('favorites').where('userId', body.userId)
    .then((result) => {
      cb(result);
    })
  }
}

module.exports = favoriteController;