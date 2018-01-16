const knex = require('../../server/config.js').knex;

const restaurantsController = {
  add: (body, cb) => {
    knex('restaurants').insert({
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
    knex('restuarants')
    .then((result) => {
      cb(result);
    })
  }
}

module.exports = restaurantsController;