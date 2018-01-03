

import React from 'react';
import EntryListItem from './EntryListItem.js';

const  EntryList = (props) =>(
  <div style={{display: 'flex', flexWrap: 'wrap'}}>
    {props.list.map((item, idx)=>{
    	return <EntryListItem key={idx} item={item}/> })}
  </div>
)

export default EntryList;