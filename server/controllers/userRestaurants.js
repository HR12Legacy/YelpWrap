const knex = require('../../server/config.js').knex;

const restaurantsController = {
  add: (body, cb) => {
    knex('userRestaurants').insert({
      userId: body.userId,
      restaurantId: body.restaurantId,
    }).then(() => {
      cb();
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