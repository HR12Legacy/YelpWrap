const io = require('./server.js').io

module.exports = {
  connect: function(socket) {    
    socket.on('newRoom', (newroom) => {
      socket.on(`${newroom}`, (message) => {
        console.log('called')
        io.emit(`${newroom}`, message)
      })
    })

    socket.on('disconnect', () => {
      socket.removeListener('newRoom', () => {
        console.log('disconnecting')
      })
    })
  },
}
