const bookshelf = require('../config.js').db;
const Ziproom = require('./Ziproom.js');

let Message = bookshelf.Model.extend({
  tableName: 'messages',
  ziproom: function() {
    return this.belongsTo(Ziproom);
  }
})

module.exports = Message;