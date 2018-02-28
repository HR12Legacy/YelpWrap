import React from 'react';
import io from 'socket.io-client';
import $ from 'jquery';
import axios from 'axios';
import { getMuiTheme } from 'material-ui/styles/getMuiTheme';

class ChatBot extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      socket: null,
      user: null,
      message: '',
      currentRoomId: null,
      reviews: [],
      reviewNumber: Math.floor(Math.random() * 3),
      currentIndex: null,
      attention: false,
      knock: 0,
      howareyou: 0
    }
    this.initSocket = this.initSocket.bind(this)
    this.saveMessage = this.saveMessage.bind(this)
    this.botSubmit = this.botSubmit.bind(this)
    this.getRoomData = this.getRoomData.bind(this)
    this.messageHandler = this.messageHandler.bind(this)

    this.oops = this.oops.bind(this)
    this.attention = this.attention.bind(this)
    this.more = this.more.bind(this)
    this.describe = this.describe.bind(this)
    this.rating = this.rating.bind(this)
    this.price = this.price.bind(this)
    this.phone = this.phone.bind(this)
    this.open = this.open.bind(this)
    this.link = this.link.bind(this)
    this.delivery = this.delivery.bind(this)
    this.directions = this.directions.bind(this)
    this.skills = this.skills.bind(this)
    this.knock = this.knock.bind(this)
    this.howareyou = this.howareyou.bind(this)

    this.findRestaurant = this.findRestaurant.bind(this)
    this.nextReview = this.nextReview.bind(this)
  }

  componentWillMount() {
    this.initSocket();
  }

  componentDidMount() {
    // let {socket} = this.state;
    // socket.emit('newRoom', `${this.props.location}`)
    // this.getRoomData()
    // socket.on(`${this.props.location}`, (message) => {
    //   this.messageHandler(message)
    // })
  }

  componentWillReceiveProps() {
    let {socket} = this.state
    socket.disconnect()
    socket.connect()
    socket.off()
    socket.emit('newRoom', `${this.props.location}`)
    this.getRoomData()
    socket.on(`${this.props.location}`, (message) => {
      console.log('ok')
      this.messageHandler(message)
    })
    this.setState({
      attention: false,
      currentIndex: null
    })
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
      const choices = ['chatbot', 'tell me about', 'how is', 'show me', 'describe', 'eat', 'suggest', 'more', 'continue', 'go on', 'rating', 'rate', 'review', 'star', 'how much', 'cost', 'price', 'expensive', 'cheap', 'phone', 'call', 'reach', 'hours', 'it open', 'it closed', 'yelp', 'link', 'website', 'site', 'pickup', 'delivery', 'deliver', 'direction', 'where', 'map', 'skills', 'you do', 'help', 'knock', 'how are you']
      const matches = {
        // greeting
        'chatbot': 'attention',
        // tell me about
        'tell me about': 'describe',
        'how is': 'describe',
        'show me': 'describe',
        'describe': 'describe',
        'eat': 'describe',
        'suggest': 'describe',
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
        'deliver': 'delivery',
        // give me directions
        'direction': 'directions',
        'where': 'where',
        'map': 'directions',
        // let me make a reservation
        // 'reservation': 'reservation',
        // 'reserve': 'reservation',
        // oops
        'oops': 'oops',
        // skills
        'skills': 'skills',
        'you do': 'skills',
        'help': 'skills',
        // knock knock
        'knock': 'knock',
        // whats up
        'how are you': 'how are you'
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
          } else if (answerType === 'more') {
            this.more()
          } else if (answerType === 'rating') {
            this.rating()
          } else if (answerType === 'price') {
            this.price()
          } else if (answerType === 'phone') {
            this.phone()
          } else if (answerType === 'open') {
            this.open()
          } else  if (answerType === 'link') {
            this.link()
          } else if (answerType === 'delivery') {
            this.delivery()
          } else if (answerType === 'directions') {
            this.directions()
          } else if (answerType === 'skills') {
            this.skills()
          } else if (answerType === 'knock') {
            this.knock()
          } else if (this.state.knock === 1) {
            this.who(message.message)
          } else if (this.state.knock === 2) {
            this.haha()
          } else if (answerType === 'how are you') {
            this.howareyou()
          } else if (this.state.howareyou === 1) {
            this.howareyoutwo()
          } else if (answerType === 'oops') {
          this.oops()
          }
        }
      }
    }
  }

  attention() {
    this.setState({
      attention: !this.state.attention,
    }, ()=> {
      let attentionString = 'Oh hey there! How can I help?'
      if (!this.state.attention) {
        attentionString = 'Beep boop. Goodbye!'
      }
      setTimeout(()=> {
        this.botSubmit(attentionString)
      }, 500)
    })
  }

  oops() {
    setTimeout(() => {
      this.botSubmit(
        `Siri voice: I'm not sure I understand`
      )
    }, 500);
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
    } else if (this.props.restaurants.length > 0 && !finder){
      axios.get('/reviews/' + this.props.restaurants[0].id)
      .then((reviews) => {
        this.setState({
          reviews: reviews.data,
          reviewNumber: this.nextReview(this.state.reviewNumber),
          currentIndex: 0
        }, ()=> {
          setTimeout(()=> {
            this.botSubmit(`Hmmm. Why don't you check out ` + this.props.restaurants[0].name)
          }, 500)
        })
      })
    }
  }

  more() {
    this.setState({
      reviewNumber: this.nextReview(this.state.reviewNumber),
    }, ()=> {
      setTimeout(()=> {
        this.botSubmit(this.state.reviews[this.state.reviewNumber].text)
      }, 500)
    })
  }

  memes() {
    // MOST IMPORTANT FEATURE MUST COMPLETE
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
    if (this.props.restaurants.length > 0 && this.state.currentIndex !== null) {
      setTimeout(() => {
        this.botSubmit(
          'You can reach them at ' +
          this.props.restaurants[this.state.currentIndex].display_phone +
          ' or just ask me because who makes phone calls anymore.'
        )
      }, 500)
    }
  }

  open() {
    if (this.props.restaurants.length > 0 && this.state.currentIndex !== null) {
      setTimeout(() => {
        const openString = {
          false: `It's open according to Yelp, but that assumes the hours are correct on Yelp so I accept no responsbility for your wasted time.`,
          true: `Beep boop it's closed.`
        }
        this.botSubmit(
          openString[this.props.restaurants[this.state.currentIndex].is_closed]
        )
      }, 500)
    }
  }

  link() {
    if (this.props.restaurants.length > 0 && this.state.currentIndex !== null) {
      setTimeout(() => {
        this.botSubmit(
          `I'm not sure what the homepage is but you can probably find it at ` + 
          this.props.restaurants[this.state.currentIndex].url
        )
      }, 500)
    }
  }

  delivery() {
    if (this.props.restaurants.length > 0 && this.state.currentIndex !== null) {
      const transactions = this.props.restaurants[this.state.currentIndex].transactions
      const deliveryString = {
        0: `I'm not sure. Try calling them at ` + this.props.restaurants[this.state.currentIndex].display_phone + '.',
        1: `They have delivery but you have to deliver the food yourself.`,
        2: `You're in luck! This establishment does pickup and delivery.`,
      }
      setTimeout(() => {
        this.botSubmit(
          deliveryString[transactions.length]
        )
      }, 500)
    }
  }

  directions() {
    if (this.props.restaurants.length > 0 && this.state.currentIndex !== null) {
      let origin = encodeURI(this.props.location)
      let destination = encodeURI(this.props.restaurants[this.state.currentIndex].name)
      let mapLink = 'https://www.google.com/maps/dir/?api=1&origin=' + origin + '&destination=' + destination;
      setTimeout(() => {
        // refactor with client side link parsing and escaping for security
        this.botSubmit(
          `<a href=` + mapLink + ` target="_blank">Here's directions provided by my friend Googlebot.</a>`
        )
      }, 500)
    }
  }

  skills() {
    setTimeout(() => {
      this.botSubmit(
        `You can ask me about any restaurant on the map or the list. I can tell you a little about it or find the price, rating, phone number, link, whether it's open or not, pickup and delivery options, and my favorite part, directions. I also love to hear new knock knock jokes.`
      )
    }, 500)
  }

  knock() {
    this.setState({
      knock: 1
    }, ()=> {
      setTimeout(() => {
        this.botSubmit(`Who's there?`)
      }, 500)
    })
  }

  who(message) {
    this.setState({
      knock: 2
    }, ()=> {
      setTimeout(() => {
        this.botSubmit(message + ` who?`)
      }, 500)
    })
  }

  haha() {
    this.setState({
      knock: 0
    }, ()=> {
      setTimeout(() => {
        this.botSubmit(`Hahaha what a story Mark!`)
      }, 500)
    })
  }

  howareyou() {
    this.setState({
      howareyou: 1
    }, ()=> {
      setTimeout(() => {
        this.botSubmit(`I'm great! Nothing like spending your day looking up restaurant info for people. How about you?`)
      }, 500)
    })
  }

  howareyoutwo() {
    this.setState({
      howareyou: 0
    }, ()=> {
      setTimeout(() => {
        this.botSubmit(`Nice.`)
      }, 500)
    })
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
        this.setState({
          currentRoomId: data.data.room.id,
        })
      })
  }

  initSocket() {
    const socket = io()
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
