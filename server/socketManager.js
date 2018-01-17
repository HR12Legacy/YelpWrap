const io = require('./server.js').io

module.exports = {
  connect: function(socket) {
    console.log('socketId: ', socket.id)
    
    socket.on('disconnect', () => {
      console.log('user disconnected')
    })

    socket.on('newRoom', (newroom) => {
      console.log('newroom', newroom)
      socket.leave(socket.room)
      socket.room = newroom;
      socket.on(`${newroom}`, (message) => {
        console.log('hello')
        io.emit(`${newroom}`, message)
      })
    })
  }
}
