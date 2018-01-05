 import React from 'react';
import style from './container.css';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import ActionSearch from 'material-ui/svg-icons/action/search';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';



class Search extends React.Component {
  constructor (props){
    super(props)
    this.state = {
      term: '',
      location: '',
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
    this.props.search(this.state.term, this.state.location, this.props.filter, this.props.sortBy, this.props.openNow);
  }

  //MERGE COPY WITH SELECT AND MY NEW TEXT FIELDS
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
      <MuiThemeProvider muiTheme={getMuiTheme()}>
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
      &nbsp;&nbsp;

        <br/>
        &nbsp;&nbsp;

        <select name="filter" onChange={this.props.filterFunc}>
          <option value="" disabled selected hidden>Select a price filter</option>
          <option value="1">$</option>
          <option value="2">$$</option>
          <option value="3">$$$</option>
          <option value="4">$$$$</option>
        </select> 
        
        &nbsp;&nbsp;

        <select name="sortBy" onChange={this.props.filterFunc} >
          <option value="" disabled selected hidden>Sort by</option>
          <option value="best_match">Best Match</option>
          <option value="rating">Highest Rated</option>
          <option value="review_count">Most Reviewed</option>
        </select>
        &nbsp;&nbsp;<button name='openNow' onClick={this.props.filterFunc} > OPEN NOW</button>
        &nbsp;&nbsp;<button name='delivery' onClick={this.props.filterFunc} >Has Delivery</button>

        <br/>&nbsp;&nbsp;<button onClick={this.clickHandler}>Search</button>   

      </form>
        
    </MuiThemeProvider>
    </div>
    );

  }


}


export default Search;

