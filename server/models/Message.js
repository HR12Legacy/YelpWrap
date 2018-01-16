const bookshelf = require('../config.js').db;

let Message = bookshelf.Model.extend({
  tableName: 'messages'
})

module.exports = Message;