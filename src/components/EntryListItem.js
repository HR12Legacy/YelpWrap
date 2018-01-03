import React from 'react'

const EntryListItem = (props) =>(
  <div style={{ padding:15, margin: 15, border: '1px solid red'}}>
    
    <a href={props.item.url}><img src={props.item.image_url} alt="item" height="170" width="170"/></a>
    <figcaption>
      {props.item.name}
      <br/> {props.item.phone}<br/>
      {props.item.location.address1}<br/>
      {props.item.location.city}, {props.item.location.state}, {props.item.location.zip_code}<br/>
    </figcaption>
  
  </div>
  )
export default EntryListItem;