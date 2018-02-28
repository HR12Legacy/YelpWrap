import React from 'react';
import GridListItem from './EntryListItem.js';
import {GridList} from 'material-ui/GridList';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridList: {
    width: '100%',
    height: '73vh',
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
        <MuiThemeProvider>
          <GridList cols="1" style={styles.gridList}>
            { 
              this.props.list.map((item, idx)=>{return <GridListItem userId={ this.props.userId }key={ idx } item={ item } generateFavorites={this.props.generateFavorites}/>})
            }
          </GridList>
          </MuiThemeProvider>
       </div>
    )}
}

export default EntryList;

