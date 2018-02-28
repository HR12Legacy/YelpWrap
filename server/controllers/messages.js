const Message = require('../models/Message.js');
const User = require('../models/User.js');
const Knex = require('../config.js').knex

const messageController = {
  addMessage: (message, cb) => {
    let instance = new Message({
      content: message.content,
      roomId: message.roomId,
      userId: message.userId
    }).save()
      .then(model => {
        console.log('message added!')
        cb(true)
      })
      .catch(error => {
        console.log('error saving message: ', error)
        cb(false)
      })
  },
  getMessageByRoom: (roomId, cb) => {
    Knex.select('*')
        .from('messages')
        .where({
          roomId: roomId
        })
        .leftJoin('users', 'users.id', 'messages.userId')
        .then(messages => {cb(messages)})
  }
}

module.exports = messageController;