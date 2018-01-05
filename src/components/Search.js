import React from 'react';
import style from './container.css';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import ActionSearch from 'material-ui/svg-icons/action/search';




class Search extends React.Component {
  constructor (props){
    super(props)
    this.state = {
      term: '',
      location: '' 
    }
    this.changeHandler = this.changeHandler.bind(this)
    this.clickHandler = this.clickHandler.bind(this)
  }

  changeHandler(e){
    e.preventDefault();
    this.setState({[e.target.name]: e.target.value});
  }
  
  clickHandler(e){
    e.preventDefault();
    this.state.term.length && this.state.location.length ?
    this.props.search(this.state.term, this.state.location) :
    null;
  }

  render(){
    const styles = {
      smallIcon: {
        width: 36,
        height: 36,
      },
      mediumIcon: {
        width: 48,
        height: 48,
      },
      largeIcon: {
        width: 60,
        height: 60,
      },
      small: {
        width: 72,
        height: 72,
        padding: 16,
      },
      medium: {
        width: 96,
        height: 96,
        padding: 24,
      },
      large: {
        width: 120,
        height: 120,
        padding: 30,
      },
    };

    return (<div className={style.searchContainer} >
      <form style={{float: "left"}}>
        <div>
        <TextField
          floatingLabelText="Place, Bussiness, Restaurant..."
          name="term"
          onChange={this.changeHandler}
          value={this.state.term}
        />
        <TextField
          floatingLabelText="Zipcode"
          name="location"
          onChange={this.changeHandler}
          value={this.state.location}
        />
        <IconButton
          iconStyle={styles.smallIcon}
          style={styles.small}
          onClick={this.clickHandler}
        >
          <ActionSearch/>
        </IconButton> 
        </div>
      </form>
    </div>);
  }


}


export default Search;

