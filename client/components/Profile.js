import React from 'react';
import styles from './entries.css'
import EntryList from './EntryList.js';
import { Card, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import axios from 'axios';

class Profile extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      changeZip: false,
      newZip: ''
    }
    this.inputSwitcher = this.inputSwitcher.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.updateHomeZip = this.updateHomeZip.bind(this);
    this.uploadWidget = this.uploadWidget.bind(this);
  }
  
  inputSwitcher() {
    this.setState({
      changeZip: !this.state.changeZip,
    })
  }

  handleChange(e) {
    this.setState({
      newZip: e.target.value
    })
  }

  updateHomeZip() {
    if (this.state.newZip.length === 5) {
      console.log(this.props.user.email, this.state.newZip)
      axios.put('/user', {
        email: this.props.user.email,
        homezip: this.state.newZip
      }).then((updated)=> {
        this.props.refreshProfile();
        this.inputSwitcher();
      })
    }
  }
  
  uploadWidget() {
    cloudinary.openUploadWidget({ cloud_name: 'duxbiywzd', upload_preset: 'u5ddyqxg', tags:['yelpwrap']}, 
    (error, result)=> {
      axios.put('/user', {
        email: this.props.user.email,
        image_url: result[0].url
      }).then((updated)=> {
        this.props.refreshProfile();
      })
    });
  }

  render() {
    let showOrInput = (
      <div>Home Zipcode: { this.props.user ? this.props.user.homezip : '10017'}</div>
    )
    let buttonText;
    if (this.state.changeZip) {
      showOrInput = (
        <div>
          <TextField 
            style={{width: '100%'}} 
            value={this.state.newZip}
            onChange={(e)=> {this.handleChange(e)}}
            />
          <RaisedButton onClick={this.updateHomeZip}>&#10004;</RaisedButton>
        </div>
      )
      buttonText = 'Cancel'
    } else {
      buttonText = <div>&#9998;</div>;
    }
    console.log('asdkajsdkajsdhkajsd', this.props.isLoggedIn)
    if (!this.props.isLoggedIn) {
      return (
        <div>
        <Card style={{height: '75vh', padding: '2.5vh'}}>
          <div>
            Log in or create an account to see profile!
          </div>
        </Card>

        </div>
      )
    } else {
      return(
        <div>
          <Card style={{height: '75vh', padding: '2.5vh'}}>
            <img 
              src={this.props.user ? this.props.user.image_url : 'http://hotchillitri.co.uk/wp-content/uploads/2016/10/empty-avatar.jpg'}
              height="100"
              width="100"
            />
            <br/>
            <RaisedButton onClick={this.uploadWidget} className="upload-button">Update Avatar</RaisedButton>
            <br/>
            <br/>
            {showOrInput}
            <RaisedButton onClick={this.inputSwitcher}>{buttonText}</RaisedButton>
            <div className={styles.entryList} data-type="favorites">
              <EntryList faves={ this.props.faves } userId={ this.props.userId } list={this.props.faves}/>
            </div>
          </Card>
        </div>
      )
    }
  }

}

export default Profile;