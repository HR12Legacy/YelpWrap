
import React from 'react';


class Search extends React.Component {
  constructor (props){
    super(props)
    this.state = {
      term: '',
      location: '',
      // sortBy: '',
      // filter: ''
    }
    this.changeHandler = this.changeHandler.bind(this)
    this.clickHandler = this.clickHandler.bind(this)
    // this.selectHandler = this.selectHandler.bind(this)
  }

  changeHandler(e){
    e.preventDefault();
    this.setState({[e.target.name]: e.target.value});
    // console.log('term: ', this.state.term, 'location: ', this.state.location);
  }
  clickHandler(e){
    e.preventDefault();
    this.props.search(this.state.term, this.state.location, this.props.filter, this.props.sortBy, this.props.openNow);
  }

  // selectHandler(e) {
  //   e.preventDefault();
  //   this.setState({[e.target.name]: e.target.value}, ()=>{console.log(this.state)})
  //   const select = e.target.id;
  //   console.log(select);
  // }

  render(){
    return (<div>
      <form>
      &nbsp;&nbsp;
      
        <input name='term' type='text' value={this.state.term} placeholder='What do u want' 
        onChange={this.changeHandler}/>
        &nbsp;&nbsp;

        <input name='location' type='text' value={this.state.location} 
        placeholder='Where' onChange={this.changeHandler}/>
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
        
    </div>);
  }


}


export default Search;

