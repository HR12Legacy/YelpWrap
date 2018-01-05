import React from 'react';
import GridListItem from './EntryListItem.js';
import {GridList} from 'material-ui/GridList';
import styles from './entries.css';

// KeepClasses
const  EntryList = (props) => (
  <div className={styles.root}>
  {/* changed cols to equal integer */}
  	<GridList cols={1} style={styles.gridList}>
      { props.list.map((item, idx)=>{return <GridListItem key={idx} item={item}/>}) }
    </GridList>
 </div>
)

export default EntryList;

