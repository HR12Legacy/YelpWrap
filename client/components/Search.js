import React from 'react';
import style from './container.css';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import ActionSearch from 'material-ui/svg-icons/action/search';
import SelectField from 'material-ui/SelectField';
import RaisedButton from 'material-ui/RaisedButton';
import MenuItem from 'material-ui/MenuItem';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';



class Search extends React.Component {
  constructor (props){
    super(props)
    this.state = {
      term: '',
      location: '',
      openNow: false,
      delivery: false, 
      sortBy: '', 
      filter: '', 
      sortOptions: [],
      filterOptions: [] 
    }

    this.changeHandler = this.changeHandler.bind(this)
    this.clickHandler = this.clickHandler.bind(this)
    this.sort = this.sort.bind(this)
    this.filter = this.filter.bind(this)
  }

  clickHandler(e){
    e.preventDefault();
    this.props.sendLocation(this.state.location)
    this.props.search(this.state.term, this.state.location, this.state.filter, this.state.sortBy, this.state.openNow);
  }

  changeHandler(e, index, value) {
    e.preventDefault();
    if (e.target.value){
      let key = e.target.name
      let val = (e.target.value)
      this.setState({ [key] : val })
    } else if (e.target.innerHTML === 'Open Now'){
       this.setState({openNow: !this.state.openNow})
    } else if (e.target.innerHTML === 'Has Delivery'){
      this.setState({delivery: !this.state.delivery})
    } 
  }

  sort(e, index, value){
    this.setState({sortBy: value})
  }

  filter(e, index, value){
    this.setState({filter: value})
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
      buttonOpen:{
        backgroundColor: '#808080',
        borderRadius: '7px',
        fontFamily: 'Arial',
        color: '#ffffff',
        fontSize: '13px',
        // padding: '10px',
      },
      dropDown:{
        backgroundColor: '#808080',
        borderRadius: '7px',
        fontFamily: 'Arial',
        color: '#ffffff',
        fontSize: '13px',
        padding: '20px',
      }
    };

    return (<div className={style.searchContainer} >
      <MuiThemeProvider muiTheme={getMuiTheme()}>
      <form style={{float: "left"}}>
       
        <div>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <TextField
          floatingLabelText="Place, Business, Restaurant..."
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
        <br/>
        <div>
        &nbsp;&nbsp;&nbsp;
          <SelectField style={{width: '150px'}} floatingLabelText="Price" value={this.state.filter} onChange={this.filter}>
            <MenuItem value="" primarytext="Tha Dolla Menu"/>
            <MenuItem value="2" primaryText="$$"/>
            <MenuItem value="3" primaryText="$$$"/>
            <MenuItem value="4" primaryText="Bourgeoisie"/>
          </SelectField> 
          
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
       
          <SelectField style={{width: '150px'}} floatingLabelText="Sort By"  value={this.state.sortBy} onChange={this.sort} >
            <MenuItem value="best_match" primaryText="Best Match"></MenuItem>
            <MenuItem value="rating" primaryText="Highest Rated"></MenuItem>
            <MenuItem value="review_count" primaryText="Most Reviewed"></MenuItem>
          </SelectField>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <RaisedButton name='openNow' onClick={this.changeHandler} label="Open Now" primary={this.state.openNow}/>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <RaisedButton name='delivery' onClick={this.changeHandler} label="Has Delivery" primary={this.state.delivery}/>
       </div>
       <br/>

      </form>
    </MuiThemeProvider>
    </div>
    );
  }
}


export default Search;

