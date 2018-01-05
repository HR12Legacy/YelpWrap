const knex = require('../../server/bookshelf.js').knex;

const userController = {
  add: (body, cb) => {
    knex('users').insert({
      username: body.username,
    }).then((user) => {
      cb();
    })
  }
}

module.exports = userController;