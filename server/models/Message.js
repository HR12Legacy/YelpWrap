const bookshelf = require('../config.js').db;
const Ziproom = require('./Ziproom.js');
const User = require('./User.js');

let Message = bookshelf.Model.extend({
  tableName: 'messages',
  ziproom: function() {
    return this.belongsTo(Ziproom);
  },
  users: function() {
    return this.belongsTo(User, 'userId')
  }
})

module.exports = bookshelf.model('Message', Message);