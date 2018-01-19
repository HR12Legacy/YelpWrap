import React from 'react';
import io from 'socket.io-client';
import $ from 'jquery';
import axios from 'axios';
import { getMuiTheme } from 'material-ui/styles/getMuiTheme';

const socketUrl = 'http://localhost:1337'

class ChatBot extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      socket: null,
      user: null,
      message: '',
      currentRoomId: null,
      reviews: [],
      reviewNumber: 0,
      currentIndex: null,
      attention: false
    }
    this.initSocket = this.initSocket.bind(this)
    this.saveMessage = this.saveMessage.bind(this)
    this.botSubmit = this.botSubmit.bind(this)
    this.getRoomData = this.getRoomData.bind(this)
    this.messageHandler = this.messageHandler.bind(this)

    this.attention = this.attention.bind(this)
    this.describe = this.describe.bind(this)
    this.rating = this.rating.bind(this)
    this.price = this.price.bind(this)
    this.phone = this.phone.bind(this)

    this.findRestaurant = this.findRestaurant.bind(this)
    this.nextReview = this.nextReview.bind(this)
  }

  componentWillMount() {
    this.initSocket();
  }

  componentDidMount() {
    let {socket} = this.state;
    socket.emit('newRoom', `${this.props.location}`)
    this.getRoomData()
    socket.on(`${this.props.location}`, (message) => {
      this.messageHandler(message)
    })
  }

  componentWillReceiveProps(newProps) {
    if (this.props.location !== newProps.location) {
      let {socket} = this.state
      socket.disconnect()
      socket.connect()
      socket.off()
      socket.emit('newRoom', `${newProps.location}`)
    } 
  }

  findRestaurant(message) {
    const lowerCaseMessage = message.toLowerCase()
    const restaurants = this.props.restaurants;
    for (let i = 0; i < restaurants.length; i++) {
      let restaurant = restaurants[i].name.toLowerCase()
      if (lowerCaseMessage.search(restaurant) !== -1) {
        return {id: restaurants[i].id, index: i}
      }
    }
    return false;
  }

  nextReview(num) {
    if (num === 2) {
      return 0
    } else {
      return num + 1;
    }
  }

  messageHandler(message) {
    if (message.username !== 'chatbot') {
      const choices = ['chatbot', 'tell me about', 'how is', 'show me', 'describe', 'more', 'continue', 'go on', 'rating', 'rate', 'review', 'star', 'how much', 'cost', 'price', 'expensive', 'cheap', 'phone', 'call', 'reach', 'hours', 'it open', 'it closed', 'yelp', 'link', 'website', 'site', 'pickup', 'delivery', 'directions', 'reservation']
      const matches = {
        // greeting
          'chatbot': 'attention',
        // tell me about
          'tell me about': 'describe',
          'how is': 'describe',
          'show me': 'describe',
          'describe': 'describe',
        // tell me more -> iterate through info choices
          'more': 'more',
          'continue': 'more',
          'go on': 'more',
        // rating? -> rating with num reviews
          'rating': 'rating',
          'rate': 'rating',
          'review': 'rating',
          'star': 'rating',
        // price?
          'how much': 'price',
          'cost': 'price',
          'price': 'price',
          'expensive': 'price',
          'cheap': 'price',
        // phone number?
          'phone': 'phone',
          'call': 'phone',
          'reach': 'phone',
        // is it open?
          'hours': 'open',
          'it open': 'open',
          'it closed': 'open',
        // give me a link
          'yelp': 'link',
          'link': 'link',
          'website': 'link',
          'site': 'link',
        // what are its pickup and delivery options
          'pickup': 'delivery',
          'delivery': 'delivery',
        // give me directions
          'directions': 'directions',
          'map': 'directions',
        // let me make a reservation
          'reservation': 'reservation',
          'reserve': 'reservation',
        // oops
          'oops': 'oops'
      }
      const lowerCaseMessage = message.message.toLowerCase();
      let matchedChoice = 'oops'
      for (let choice of choices) {
        let startIndex = lowerCaseMessage.search(choice);
        if (startIndex !== -1) {
          matchedChoice = choice
        }
      }
      const answerType = matches[matchedChoice];
      if (answerType === 'attention') {
        this.attention()
      } else {
        if (this.state.attention) {
          if (answerType === 'describe') {
            this.describe(message.message)
          } else if (answerType === 'rating') {
            this.rating()
          } else if (answerType === 'price') {
            this.price()
          } else if (answerType === 'phone') {
            this.phone()
          }
        }
      }
    }
  }

  attention() {
    this.setState({
      attention: !this.state.attention,
    }, ()=> {
      setTimeout(()=> {
        this.botSubmit('Oh hey there! How can I help?')
      }, 500)
    })
  }

  describe(message) {
    let finder = this.findRestaurant(message)
    if (this.props.restaurants.length > 0 && finder) {
      axios.get('/reviews/' + finder.id)
      .then((reviews) => {
        this.setState({
          reviews: reviews.data,
          reviewNumber: this.nextReview(this.state.reviewNumber),
          currentIndex: finder.index
        }, ()=> {
          setTimeout(()=> {
            this.botSubmit(this.state.reviews[this.state.reviewNumber].text)
          }, 500)
        })
      })
    }
  }

  rating() {
    if (this.props.restaurants.length > 0 && this.state.currentIndex !== null) {
      setTimeout(() => {
        this.botSubmit(
          'It has ' + 
          this.props.restaurants[this.state.currentIndex].rating + 
          ' stars based on ' + 
          this.props.restaurants[this.state.currentIndex].review_count +
          ' reviews!'
        )
      }, 500);
    }
  }

  price() {
    if (this.props.restaurants.length > 0 && this.state.currentIndex !== null) {
      const priceString = {
        '$': `It's pretty cheap!`,
        '$$': `It's affordable for the most part.`,
        '$$$': `Check your balance before going...`,
        '$$$$': `Be ready to take out a second mortgage.`
      }
      setTimeout(() => {
        this.botSubmit(
          priceString[this.props.restaurants[this.state.currentIndex].price]
        )
      }, 500)
    }
  }

  phone() {
    
  }

  getReviews() {
    axios.get('/reviews/' + this.props.restaurants[0].id)
    .then((reviews) => {
      this.setState({
        reviews: reviews.data
      }, ()=> {
        this.botSubmit(this.state.reviews[0].text)
      })
    })
  }

  getRoomData() {
    axios.post('/ziproom', {"zipcode": this.props.location})
      .then(data => {
        console.log('submitting')
        this.setState({
          currentRoomId: data.data.room.id,
        }, () => {
          // this.botSubmit()
        })
      })
  }

  initSocket() {
    const socket = io(socketUrl)
    this.setState({socket})
  }

  botSubmit(message) {
    const username = 'chatbot'
    const {socket} = this.state
    this.saveMessage(message)
    socket.emit(`${this.props.location}`, {
      username: 'chatbot',
      message: message,
      picture: 'https://edspace.american.edu/perf683/wp-content/uploads/sites/392/2015/10/robot.png'
    })
    this.setState({
        message: ''
    })
  }

  saveMessage(message) {
    axios.post('/message', {
      content: message,
      roomId: this.state.currentRoomId,
      userId: 1
    })
  }

  render() {
    return null
  }
}

export default ChatBot;
