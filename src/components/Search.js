
import React from 'react';


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
    console.log('term: ', this.state.term, 'location: ', this.state.location);
  }
  clickHandler(e){
    e.preventDefault();
    this.props.search(this.state.term, this.state.location);
  }

  render(){
    return (<div>
      <form>
        <input name='term' type='text' value={this.state.term} placeholder='What do u want' 
        onChange={this.changeHandler}/>

        <br/><input name='location' type='text' value={this.state.location} 
        placeholder='Where' onChange={this.changeHandler}/>

        <br/><button onClick={this.clickHandler}>Search</button>

      </form>
    </div>);
  }


}


export default Search;

