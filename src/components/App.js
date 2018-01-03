import React from 'react';
import Search from './Search.js';
import EntryList from './EntryList.js';
const axios = require('axios');

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state ={
      results: []
    }
    this.searchHandler = this.searchHandler.bind(this);

  }

  componentDidMount() {
    this.searchHandler();
  }

  searchHandler(term='delis', location='10007'){
    axios.post('/search', {term: term, location: location})
    .then((data) => {
      this.setState({results: data.data})
      console.log(this.state.results);
    })
    .catch((err) => {
      console.log('err from axios: ', err);
    });
  }

  // getList() {

  // }

  render() {
    return (
      <div>
        <h1> Hello World </h1>
        <Search search={this.searchHandler}/>
        <EntryList list={this.state.results}/>
      </div>
    )
  }
}
