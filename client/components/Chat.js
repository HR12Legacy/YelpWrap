import React from 'react';
import io from 'socket.io-client';
import $ from 'jquery';
import axios from 'axios';
import Avatar from 'material-ui/Avatar'
import append from 'append-react-dom'
import ReactDOM from 'react-dom'
import moment from 'moment'

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
    this.renderNewMessage = this.renderNewMessage.bind(this)
  }

  componentWillMount() {
    this.initSocket();
  }

  componentDidMount() {
      let {socket} = this.state;
      socket.disconnect()
      socket.connect()
      socket.emit('newRoom', `${this.props.location}`)
      socket.off()
      socket.removeAllListeners()
      socket.removeListener(`${this.props.location}`)
      
      this.getMessagesForRoom(this.props.location)
      
      socket.on(`${this.props.location}`, (message) => {
        this.renderNewMessage(message)
      }) 

  }

  componentWillUnmount() {
    let {socket} = this.state;
    socket.disconnect();
    socket.off()
    socket.removeAllListeners()
    socket.removeListener(`${this.props.location}`)
  }

  componentWillReceiveProps(newProps) {
    if (this.props.location !== newProps.location) {
      let {socket} = this.state
      socket.disconnect()
      socket.connect()
      socket.off()
      socket.removeAllListeners()
      socket.removeListener(`${this.props.location}`)
      socket.emit('newRoom', `${newProps.location}`)
      
      this.getMessagesForRoom(newProps.location)
      
      socket.on(`${newProps.location}`, (message) => {
        this.renderNewMessage(message)
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
    const username = this.props.user.name || 'Anonymous'
    const {socket} = this.state
    const {message} = this.state
    console.log('sending url', this.props.user.image_url)
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
              this.props.getZips()
            })
         })
  }

  renderOldMessages() {
    $('#messages').empty();
    this.state.messages.forEach(message => {
      message.image_url = message.image_url || "http://hotchillitri.co.uk/wp-content/uploads/2016/10/empty-avatar.jpg"
      
      const $container = $(`<li></li>`);
      const $username = $(`<p>${message.name || 'Anonymous'}  <span class="timestamp">${moment(message.created_at).fromNow()}</span></p>`)
      const $message = $(`<p>${message.content}</p>`)
      const $break = $(`<br/>`)
      const $image = $(`<img src="${message.image_url}" />`)

      $container.addClass('messageContainer')
      $username.addClass('username')
      $message.addClass('message')
      $image.addClass('images')
      
      $container.append($image, $username, $break, $message)
      $('#messages').append($container)
      $('#messages').animate({scrollTop: $('#messages').prop('scrollHeight')}, 0)
    })
  }

  renderNewMessage(message) {
    const image_url = ((message.picture === 'undefined' || message.picture === 'null') ? "http://hotchillitri.co.uk/wp-content/uploads/2016/10/empty-avatar.jpg" : message.picture); 
    const $container = $(`<li></li>`);
    const $username = $(`<p>${message.username} <span class="timestamp">${moment().fromNow()}</span></p>`)
    const $message = $(`<p>${message.message}</p>`)
    const $break = $(`<br/>`)
    const $image = $(`<img src=${image_url} />`)
    const differentClass = (message.username === this.props.user.name) ? 'userMessageContainer' : 'messageContainer'
    $container.addClass(differentClass)
    $username.addClass('username')
    $message.addClass('message')
    $image.addClass('images')
    $container.append($image, $username, $break, $message)
    $('#messages').append($container)
    $('#messages').animate({scrollTop: $('#messages').prop('scrollHeight')}, 1000)
  }

  saveMessage(message) {
    axios.post('/message', {
      content: message,
      roomId: this.state.currentRoomId,
      userId: this.props.user.id
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


