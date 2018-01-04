import React from 'react'

const EntryListItem = (props) =>(
  <div style={{ padding:15, margin: 15, border: '1px solid red', width: '100%', height: '60px'}}>
    
    <a href={props.item.url}><img src={props.item.image_url} alt="item" height="100%" width="25%"/></a>
    <div style={{float: 'right'}}>
      <span>{props.item.name}</span> <br/>
      <span>{props.item.phone}</span>  <br/>
      <span>{props.item.location.address1}</span> <br/>
      <span>{Object.keys(props.item.location).reduce((arr, key) => {
        let dataKeys = {'city': true, 'state': true, 'zip_code': true}
          if(dataKeys[key]) {
            arr.push(`${props.item.location[key]} `)
          }
          return arr;
      }, [])}</span>
    </div>
  
  </div>
  )
export default EntryListItem;

