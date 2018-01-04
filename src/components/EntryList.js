import React from 'react';
import EntryListItem from './EntryListItem.js';
import style from './entries.css'

const  EntryList = (props) => (
  <div className={style.entryList}>
      { props.list.map((item, idx)=>{return <EntryListItem key={idx} item={item}/>}) }
 </div>
)

export default EntryList;

