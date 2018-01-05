import React from 'react'
import style from './entries.css'
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import ServerActions from '../ServerActions.js';



class GridListItem extends React.Component {
  constructor(props){
    super(props);
    this.handleFavorite = this.handleFavorite.bind(this);
  }
  
  handleFavorite () {
    console.log(this.props)
    ServerActions.postRequest('/favorite', {
      userId: this.props.userId,
      url:this.props.item.url,
      img_url: this.props.item.image_url,
      location: this.props.item.location,
      name: this.props.item.name,
      phone: '',
      display_address: this.props.item.location.display_address
    }, console.log)
  }

  render(){
    return (
      <GridTile
        key={this.props.item.image_url}
        title={this.props.item.name}
        subtitle={<span>{this.props.item.location.display_address || this.props.item.display_address}</span>}
        actionIcon={<IconButton onClick={this.handleFavorite}><StarBorder color="white" /></IconButton>}
      >
      <img src={this.props.item.image_url} />
      </GridTile>
      )
  }
}

export default GridListItem;












