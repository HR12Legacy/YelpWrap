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
    }).then((insertedRestaurant) => {
      // create association between restaurant and user
      knex('userRestaurants').insert({
        userId: body.userId,
        restaurantId: insertedRestaurant.id
      }).then(() => {
        cb();
      })
    })
  },
  retrieve: (body, cb) => {
    knex('userRestaurants').where('userId', body.userId)
    .then((result) => {
      cb(result);
    })
  }
}

module.exports = restaurantsController;