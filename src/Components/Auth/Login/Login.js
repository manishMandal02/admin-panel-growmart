import {
  CircularProgress,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  TextField,
} from '@material-ui/core';
import { Storefront, Visibility, VisibilityOff } from '@material-ui/icons';
import { Alert } from '@material-ui/lab';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import classes from './Login.module.scss';
import { adminLogin, adminLogout } from '../../../Store/Actions/UserActions';
import { Helmet } from 'react-helmet';
//###/ActionTypes##
const Login = () => {
  //state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [visible, setVisible] = useState(false);

  const history = useHistory();

  const dispatch = useDispatch();

  const admin = useSelector((state) => state.user.admin);
  const { loading, adminInfo, error } = admin;

  useEffect(() => {
    if (adminInfo && adminInfo.isAdmin) {
      history.push('/dashboard');
    }
    if (adminInfo && !adminInfo.isAdmin) {
      setTimeout(() => {
        dispatch(adminLogout());
      }, 2000);
    }
  }, [adminInfo, dispatch, history]);

  const loginSubmitHandler = (e) => {
    console.log(email, password);
    e.preventDefault();
    dispatch(adminLogin({ email, password }));
  };

  const visiblityHandler = () => {
    visible ? setVisible(false) : setVisible(true);
  };

  return (
    <div className={classes.Container} id='login-container'>
      <Helmet>
        <title>Login | GrowMart Admin</title>
      </Helmet>
      <div className={classes.LoginForm}>
        <div className={classes.Logo}>
          <Storefront />
          GROWMART <p>Admin</p>
        </div>
        {error ? (
          <Alert
            style={{
              padding: '0 0 0 .6em',
              width: '90%',
              marginBottom: '.6em',
            }}
            severity='error'
          >
            {error.substring(0, 32)}
          </Alert>
        ) : adminInfo && !adminInfo.isAdmin ? (
          <Alert style={{ margin: '.1em 0 .2em 0 ' }} severity='error'>
            Access Denied, not an Admin
          </Alert>
        ) : null}
        <form>
          <TextField
            id='standard-basic'
            label='E-mail'
            required
            autoFocus
            type='email'
            placeholder='Enter Your Email'
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <FormControl>
            <InputLabel htmlFor='standard-adornment-password'>
              Password *
            </InputLabel>
            <Input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              id='standard-adornment-password'
              required
              fullWidth
              placeholder='Enter Your Password'
              type={visible ? 'text' : 'password'}
              // value={values.password}
              // onChange={handleChange('password')}
              endAdornment={
                <InputAdornment position='end'>
                  <IconButton
                    aria-label='toggle password visibility'
                    onClick={visiblityHandler}
                  >
                    {visible ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          {/* <div>
            <Link to='#'>Forgot Your Password?</Link>
          </div> */}

          <button type='submit' onClick={loginSubmitHandler}>
            {loading ? (
              <CircularProgress color='white' size={30} thickness={4} />
            ) : (
              'Login'
            )}
          </button>
        </form>
      </div>
      <div></div>
    </div>
  );
};

export default Login;
