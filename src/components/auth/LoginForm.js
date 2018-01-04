import React, { PropTypes } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import style from './auth.css';

const LoginForm = ({
  onSubmit,
  onChange,
  errors,
  user
}) => (
  <Card className={style.container}>
    <form action="/" onSubmit={onSubmit}>
      <h2 className={style.cardHeading}>Login</h2>

      {errors.summary && <p className={errorMessage}>{errors.summary}</p>}

      <div className={style.fieldLine}>
        <TextField
          floatingLabelText="Email"
          name="email"
          errorText={errors.email}
          onChange={onChange}
          value={user.email}
        />
      </div>

      <div className={style.fieldLine}>
        <TextField
          floatingLabelText="Password"
          type="password"
          name="password"
          onChange={onChange}
          errorText={errors.password}
          value={user.password}
        />
      </div>

      <div className={style.buttonLine}>
        <RaisedButton type="submit" label="Log in" primary />
      </div>

      
    </form>
  </Card>
);
// <CardText>Don't have an account? <Link to={'/signup'}>Create one</Link>.</CardText>
// LoginForm.propTypes = {
//   onSubmit: PropTypes.func.isRequired,
//   onChange: PropTypes.func.isRequired,
//   errors: PropTypes.object.isRequired,
//   user: PropTypes.object.isRequired
// };

export default LoginForm;