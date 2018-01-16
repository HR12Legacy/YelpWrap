const knex = require('../../server/config.js').knex;

const restaurantsController = {
  add: (body, cb) => {
    knex('restaurants').returning('id').where('url', body.url)
      .then((foundId) => {
        if (foundId.length === 0) {
          knex('restaurants').returning('id').insert({
            url: body.url,
            name: body.name,
            phone: body.phone,
            image_url: body.img_url,
            location: body.location,
            display_address: body.display_address,
          }).then((insertedId) => {
            // create association between restaurant and user
            knex('user_restaurants').insert({
              userId: body.userId,
              restaurantId: insertedId[0]
            }).then(() => {
              cb();
            })
          })
        } else {
          knex('user_restaurants').insert({
            userId: body.userId,
            restaurantId: foundId[0]
          }).then(() => {
            cb();
          })
        }
      })
  },
  retrieve: (body, cb) => {
    knex.select('*').from('user_restaurants')
      .where('userId', body.userId)
      .leftJoin('restaurants', 'restaurants.id', 'user_restaurants.restaurantId')
      .then((result) => {
        cb(result);
      })
  }
}

module.exports = restaurantsController;