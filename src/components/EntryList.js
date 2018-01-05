import React from 'react';
<<<<<<< HEAD
import GridListItem from './EntryListItem.js';
import {GridList} from 'material-ui/GridList';
=======
import EntryListItem from './EntryListItem.js';
import style from './entries.css';
>>>>>>> header


<<<<<<< HEAD
  <div style={{display: 'flex', flexWrap: 'wrap', width: '50%', overflowY: 'scroll'}}>
   { props.list.map((item, idx)=>{return <EntryListItem key={idx} item={item}/>}) }
 </div>
=======
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

>>>>>>> f378e85002826b38f9c29b53f8b205941293b524

const  EntryList = (props) => (
  <div className={styles.root}>
  	<GridList cols="1" style={styles.gridList}>
      { props.list.map((item, idx)=>{return <GridListItem key={idx} item={item}/>}) }
    </GridList>
 </div>
)

export default EntryList;

