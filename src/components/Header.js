import React from 'react';
import style from './header.css';
//Grab all top components dependencies

class Header extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  render() {
    return(
      <div>
        {this.props.links}
      </div>
    )
  }

}

export default Header;