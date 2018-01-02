import React from 'react';
import Search from './Search.js'
export default class App extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div>
        <h1> Hello World </h1>
        <Search/>
      </div>
    )
  }
}
