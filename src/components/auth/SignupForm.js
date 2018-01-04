import React, { PropTypes } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import style from './auth.css';

class SignUpForm extends React.Component {
  render() {
    return (
      <Card className={style.container}>
        <form action="/" onSubmit={this.props.onSubmit}>
          <h2 className={style.cardHeading}>Sign Up</h2>

          {this.props.errors.summary && <p className={style.errorMessage}>{this.props.errors.summary}</p>}

          <div className={style.fieldLine}>
            <TextField
              floatingLabelText="Name"
              name="name"
              errorText={this.props.errors.name}
              onChange={this.props.onChange}
              value={this.props.user.name}
            />
          </div>

          <div className={style.fieldLine}>
            <TextField
              floatingLabelText="Email"
              name="email"
              errorText={this.props.errors.email}
              onChange={this.props.onChange}
              value={this.props.user.email}
            />
          </div>

          <div className={style.fieldLine}>
            <TextField
              floatingLabelText="Password"
              type="password"
              name="password"
              onChange={this.props.onChange}
              errorText={this.props.errors.password}
              value={this.props.user.password}
            />
          </div>

          <div className={style.buttonLine}>
            <RaisedButton type="submit" label="Create New Account" primary />
          </div>

          
        </form>
      </Card>
      
    )
  }
}

// SignUpForm.propTypes = {
//   onSubmit: PropTypes.func.isRequired,
//   onChange: PropTypes.func.isRequired,
//   this.props.errors: PropTypes.object.isRequired,
//   this.props.user: PropTypes.object.isRequired
// };

export default SignUpForm;