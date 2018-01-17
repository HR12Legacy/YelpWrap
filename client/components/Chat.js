
import React from 'react';
import io from 'socket.io-client';
import events from '../chatEvents.js';
import $ from 'jquery';

const socketUrl = 'http://localhost:1337'

class Chat extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      socket: null,
      user: null,
      message: ''
    }

    this.initSocket = this.initSocket.bind(this)
    this.setUser = this.setUser.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleEnter = this.handleEnter.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentWillMount() {
    this.initSocket();
  }

  componentDidMount() {
    const {socket} = this.state
    socket.on('chat message', (message) => {
      const messageEl = document.createElement('li');
      messageEl.innerHTML = message;
      document.getElementById('messages').append(messageEl)
      $('#messages').animate({scrollTop: $('#messages').prop('scrollHeight')}, 500)
    })
  }

  initSocket() {
    const socket = io(socketUrl);
    
    socket.on('connect', () => {
      console.log('connected')
    })
    
    this.setState({socket})
  }

  setUser(user) {
    const {socket} = this.state
    socket.emit(events.userConnected, user)
    this.setState({user})
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
    socket.emit('chat message', message)
    this.setState({
        message: ''
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
