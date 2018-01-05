import React from 'react';
import GridListItem from './EntryListItem.js';
import {GridList} from 'material-ui/GridList';


const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridList: {
    width: 450,
    height: 550,
    overflowY: 'auto',
  },
};
class EntryList extends React.Component {
  constructor(props){
    super(props)
  }

  render(){
    return (
        <div className={styles.root}>
          <GridList cols="1" style={styles.gridList}>
            { 
              this.props.list ?
              this.props.list.map((item, idx)=>{return <GridListItem userId={ this.props.userId }key={ idx } item={ item }/>}):
              this.state.favorites.map((item, idx)=>{return <GridListItem userId={ this.props.userId } key={ idx } item={ item }/>})
            }
          </GridList>
       </div>
    )}
}

export default EntryList;

