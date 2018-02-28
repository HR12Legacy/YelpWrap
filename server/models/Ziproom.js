const bookshelf = require('../config.js').db;
const Message = require('./Message.js');

let Ziproom = bookshelf.Model.extend({
  tableName: 'ziproom',
  messages: function() {
    return this.hasMany(Message)
  }
})

module.exports = Ziproom;