import React from 'react';
import FavEntryListItem from './FavEntryListItem.js';
import style from './entries.css';

const  FavEntryList = (props) =>(

  <div className={style.favEntryList}>
   { props.list.map((item, idx)=>{return <FavEntryListItem key={idx} item={item}/>}) }
 </div>

)

export default FavEntryList;

