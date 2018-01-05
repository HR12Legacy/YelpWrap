import React from 'react';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import ServerActions from '../ServerActions.js';
import style from './entries.css';


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












