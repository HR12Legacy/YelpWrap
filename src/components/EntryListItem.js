import React from 'react'
<<<<<<< HEAD
import style from './entries.css'
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import ServerActions from '../ServerActions.js';
=======
import style from './entries.css';
>>>>>>> header

<<<<<<< HEAD
const EntryListItem = (props) =>(
  <div style={{ padding:15, margin: 15, border: '1px solid red', width: '100%', height: '60px'}}>
    
    <a href={props.item.url}><img src={props.item.image_url} alt="item" height="100%" width="25%"/></a>
    <div style={{float: 'right'}}>
      <span>{props.item.name}</span> <br/>
      <span>{props.item.phone}</span>  <br/>
      <span>{props.item.location.address1}</span> <br/>
      <span>{Object.keys(props.item.location).reduce((arr, key) => {
=======
// const styles =  {
//   main: {
//     width: 350,
//     height: 250,
//     overflowY: 'auto',
//   }
// }
const GridListItem = (props) => {
  return (
    <GridTile
      key={props.item.image_url}
      title={props.item.name}
      subtitle={<span>{Object.keys(props.item.location).reduce((arr, key) => {
>>>>>>> f378e85002826b38f9c29b53f8b205941293b524
        let dataKeys = {'city': true, 'state': true, 'zip_code': true}
          if(dataKeys[key]) {
            arr.push(`${props.item.location[key]} `)
          }
          return arr;
      }, [props.item.location.address1 + ', '])}</span>}
      actionIcon={<IconButton><StarBorder color="white" /></IconButton>}
    >
    <img src={props.item.image_url} />
    </GridTile>
      
  )
}

export default GridListItem;












