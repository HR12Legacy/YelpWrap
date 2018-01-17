const io = require('./server.js').io

module.exports = {
  connect: function(socket) {
    console.log('socketId: ', socket.id)
    
    socket.on('disconnect', () => {
      console.log('user disconnected')
    })

    socket.on('chat message', (message) => {
      io.emit('chat message', message)
    })
  }
}
