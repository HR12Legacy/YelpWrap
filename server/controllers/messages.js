const Message = require('../models/Message.js');

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

  },
  getMessageByUser: (user, cb) => {

  }
}

module.exports = messageController;