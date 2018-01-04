

import React from 'react';
import EntryListItem from './EntryListItem.js';

const  EntryList = (props) =>(

  <div style={{display: 'flex', flexWrap: 'wrap', height: '200px', width: '50%', overflowY: 'scroll'}}>
   { props.list.map((item, idx)=>{return <EntryListItem key={idx} item={item}/>}) }
 </div>

)

export default EntryList;



// const  EntryList = (props) =>(
//   <div style={{display: 'flex', flexWrap: 'wrap', width: '50%', height: '200px', overflowY: 'scroll'}}>
  
//     {props.list.map((item, idx)=>{return <EntryListItem key={idx} item={item}/> })}
//   </div>
// )