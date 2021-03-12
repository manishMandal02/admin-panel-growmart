import { AccountCircle, ExitToApp, Person } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { CircularProgress, Snackbar, Tooltip } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

import classes from './SettingsComponent.module.scss';
import {
  adminLogout,
  adminUpdateAction,
} from '../../Store/Actions/UserActions';
import { ADMIN_UPDATE_RESET } from '../../Store/Actions/ActionTypes';
import { Helmet } from 'react-helmet';

//###########
const Settings = () => {
  //REDIRECT if admin not loggedIn
  const history = useHistory();
  const { adminInfo } = useSelector((state) => state.user.admin);
  if (!adminInfo) {
    history.push('/login');
  }

  //   const locaion = useLocation();

  //State
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [inputDisabled, setInputDisabled] = useState(true);

  const dispatch = useDispatch();
  useEffect(() => {
    if (!adminInfo) {
      history.push('/');
    }
    if (adminInfo) {
      setEmail(adminInfo.email);
      setName(adminInfo.name);
    }
  }, [adminInfo, history, dispatch]);
  // const location = useLocation();
  const logoutHandler = () => {
    dispatch(adminLogout());
  };

  // Handle snackbar state
  const handleSnackbar = () => {
    setSnackbarOpen(false);
  };

  //get orders if keyword is orders

  const { loading, error, success } = useSelector(
    (state) => state.user.adminUpdate
  );

  if (success) {
    dispatch({
      type: ADMIN_UPDATE_RESET,
    });
    setTimeout(() => {
      logoutHandler();
    }, 2000);
  }
  //handles update profile click
  const updateProfileHandler = (e) => {
    e.preventDefault();
    setInputDisabled(true);
    if (
      name !== adminInfo.name ||
      email !== adminInfo.email ||
      password !== ''
    ) {
      dispatch(adminUpdateAction({ name, email, password }));
      setSnackbarOpen(true);
    }
  };

  return adminInfo ? (
    <div className={classes.Container}>
      <Helmet>
        <title>Settings | GrowMart Admin</title>
      </Helmet>
      <div className={classes.LeftContainer}>
        <div className={classes.WelcomeCard}>
          <Person />
          <span>
            <p>Hello,</p>
            <p>{adminInfo.name}</p>
          </span>
        </div>
        <div className={classes.SideMenu}>
          <Link to='#' id='admin-account'>
            <AccountCircle /> My Account
          </Link>
          <Link to='/' onClick={logoutHandler}>
            <ExitToApp />
            Logout
          </Link>
        </div>
      </div>
      <span className={classes.RightContainer}>
        <div className={classes.AccoutTab}>
          <p>UPDATE YOUR PROFILE</p>
          <form>
            <p>Name</p>
            <Tooltip
              placement='top'
              arrow
              title={inputDisabled ? `click Edit Profile to make changes` : ``}
            >
              <input
                type='text'
                disabled={inputDisabled}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Tooltip>
            <p>E-mail</p>
            <Tooltip
              placement='top'
              arrow
              title={inputDisabled ? `click Edit Profile to make changes` : ``}
            >
              <input
                type='email'
                disabled={inputDisabled}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Tooltip>

            <p>Password</p>
            <Tooltip
              placement='top'
              arrow
              title={inputDisabled ? `click Edit Profile to make changes` : ``}
            >
              <input
                type='password'
                disabled={inputDisabled}
                value={password}
                placeholder={'Enter Password'}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Tooltip>
            {!inputDisabled ? (
              <button
                className={classes.UpdateProfileButton}
                onClick={(e) => updateProfileHandler(e)}
              >
                {loading && !error ? (
                  <CircularProgress color='white' size={30} thickness={6} />
                ) : (
                  'Update Profile'
                )}
              </button>
            ) : (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  setInputDisabled(false);
                }}
              >
                Edit Profile
              </button>
            )}

            <Snackbar
              open={snackbarOpen}
              autoHideDuration={3000}
              onClose={handleSnackbar}
            >
              {error ? (
                <Alert severity='error' variant='filled'>
                  {error}
                </Alert>
              ) : (
                <Alert severity='success' variant='filled'>
                  Profile Updated! (logging out)
                </Alert>
              )}
            </Snackbar>
          </form>
          <Alert severity='warning'>
            You'll be logged out after your profile is updated, For security
            purpose
          </Alert>
        </div>
      </span>
    </div>
  ) : null;
};

export default Settings;
