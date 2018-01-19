
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
    const {socket} = this.state;
    socket.emit('newRoom', `${this.props.location}`)
    this.getMessagesForRoom(this.props.location)
    socket.on(`${this.props.location}`, (message) => {
      const messageEl = document.createElement('li');
      messageEl.innerHTML = message;
      document.getElementById('messages').append(messageEl)
      $('#messages').animate({scrollTop: $('#messages').prop('scrollHeight')}, 500)
    })
  }

  componentWillReceiveProps(newProps) {
    if (this.props.location !== newProps.location) {
      const {socket} = this.state
      socket.off();
      socket.emit('newRoom', `${newProps.location}`)
      this.getMessagesForRoom(newProps.location)
      socket.on(`${newProps.location}`, (message) => {
        const messageEl = document.createElement('li');
        messageEl.innerHTML = message;
        document.getElementById('messages').append(messageEl)
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
    const {socket} = this.state
    const {message} = this.state
    saveMessa
    socket.emit(`${this.props.location}`, message)
    this.setState({
        message: ''
    })
  }

  getMessagesForRoom(zipcode) {
    axios.post('/ziproom', {"zipcode": zipcode})
         .then(data => {
            this.setState({
              currentRoomId: data.data.room.id
            })
         })
  }

  saveMessage(message) {
    axios.post('/message', {
      content: message,
      roomId: this.state.roomId,
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
