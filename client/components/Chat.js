
import React from 'react';
import io from 'socket.io-client';
import events from '../chatEvents.js';
import $ from 'jquery';
import axios from 'axios';

const socketUrl = 'http://localhost:1337'

class Chat extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      socket: null,
      user: null,
      message: '',
      currentRoomId: null
    }

    this.initSocket = this.initSocket.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleEnter = this.handleEnter.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.getMessagesForRoom = this.getMessagesForRoom.bind(this)
    this.saveMessage = this.saveMessage.bind(this)
  }

  componentWillMount() {
    this.initSocket();
  }

  componentDidMount() {
    let {socket} = this.state;
    socket.emit('newRoom', `${this.props.location}`)
    this.getMessagesForRoom(this.props.location)
    socket.on(`${this.props.location}`, (message) => {
      console.log(message)
      const $username = $(`<p>${message.username}</p>`)
      const $message = $(`<p>${message.message}</p>`)
      const $image = $(`<img src="http://hotchillitri.co.uk/wp-content/uploads/2016/10/empty-avatar.jpg" />`)
      const $container = $(`<li></li>`);
      $container.append($username, $message, $image)
        $('#messages').append($message)
        $('#messages').animate({scrollTop: $('#messages').prop('scrollHeight')}, 500)
    })
  }

  componentWillReceiveProps(newProps) {
    if (this.props.location !== newProps.location) {
      let {socket} = this.state
      socket.disconnect()
      socket.connect()
      socket.off()
      socket.emit('newRoom', `${newProps.location}`)
      
      this.getMessagesForRoom(newProps.location)
      
      socket.on(`${newProps.location}`, (message) => {
        console.log(message)
        const $username = $(`<p>${message.username || 'anonymous'}</p>`)
        const $message = $(`<p>${message.message}</p>`)
        const $image = $(`<img src="http://hotchillitri.co.uk/wp-content/uploads/2016/10/empty-avatar.jpg" />`)
        const $container = $(`<li></li>`);
        $container.append($username, $message, $image)
        $('#messages').append($message)
        $('#messages').animate({scrollTop: $('#messages').prop('scrollHeight')}, 500)
      })
    } 
  }

  initSocket() {
    const socket = io(socketUrl);
    
    socket.on('connect', () => {
      console.log('connecting')
    })
    
    this.setState({socket})
  }

  handleChange(event) {
    this.setState({
      message: event.target.value
    })
  }

  handleEnter(event) {
    if (event.key === 'Enter') {this.handleSubmit()}
  }

  handleSubmit() {
    const username = this.props.user.name ? this.props.user.name : 'anonymous'
    const {socket} = this.state
    const {message} = this.state
    this.saveMessage(message)
    socket.emit(`${this.props.location}`, {
      username: `${username}`,
      message: `${message}`,
      picture: `${this.props.user.image_url}`
    })
    this.setState({
        message: ''
    })
  }

  getMessagesForRoom(zipcode) {
    axios.post('/ziproom', {"zipcode": zipcode})
         .then(data => {
            this.setState({
              currentRoomId: data.data.room.id,
              messages: data.data.messages
            }, () => {
              this.renderOldMessages()
            })
         })
  }

  renderOldMessages() {
    $('#messages').empty();
    this.state.messages.forEach(message => {
      const name = message.name || 'anonymous'
      $('#messages').append($(`<li>${name}: ${message.content}</li>`))
      $('#messages').animate({scrollTop: $('#messages').prop('scrollHeight')}, 10)
    })
  }

  saveMessage(message) {
    axios.post('/message', {
      content: message,
      roomId: this.state.currentRoomId,
      userId: this.props.userId
    })
  }

  render() {
    return (
      <div className="chatContainer">
        <div className="chat">
          <ul id="messages">
          </ul>
        </div>
        <input type="text" value={this.state.message} onChange={this.handleChange} onKeyPress={this.handleEnter}/>
        <button onClick={this.handleSubmit}>Submit</button>
      </div>
    )
  }
}

export default Chat;
