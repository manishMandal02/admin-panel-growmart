import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { CircularProgress } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { ArrowBack } from '@material-ui/icons';
import { createUserAction } from '../../../Store/Actions/UserActions';
import { CREATE_USER_RESET } from '../../../Store/Actions/ActionTypes';

import classes from './CreateUser.module.scss';
import { Helmet } from 'react-helmet';

const CreateUser = ({ history }) => {
  //initialize
  const dispatch = useDispatch();
  //   const history = useHistory();

  //state
  //Create user
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmPassword] = useState('');
  //   const [visibility, setVisibility] = useState(false);
  //   const [visibility2, setVisibility2] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const {
    loading: loadingCreateUser,
    error: errorCreateUser,
    success: successCreateUser,
  } = useSelector((state) => state.user.createUser);

  if (successCreateUser) {
    setTimeout(() => {
      dispatch({
        type: CREATE_USER_RESET,
      });
      history.push('/users');
    }, 2000);
  }

  //create user handler
  const createUserHandler = (e) => {
    e.preventDefault();
    dispatch(
      createUserAction({ name, email, password, confirmpassword, isAdmin })
    );
  };

  return (
    <>
      <Helmet>
        <title>Add User | GrowMart Admin</title>
      </Helmet>
      <div className={classes.GoBack} onClick={() => history.push('/users')}>
        <button>
          <ArrowBack /> Go Back
        </button>
      </div>
      <div className={classes.Wrapper}>
        {errorCreateUser ? (
          <Alert
            style={{
              margin: '0 0.6em ',
              height: '7%',
              marginTop: '.4em',
              padding: '-.4em 0 0em .4em',
            }}
            severity='error'
            variant='filled'
          >
            {errorCreateUser.substring(0, 24)}
          </Alert>
        ) : successCreateUser ? (
          <Alert
            style={{
              margin: '0 0.6em ',
              height: '7%',
              marginTop: '.4em',
              padding: '-.4em 0 0em .4em',
            }}
            severity='success'
            variant='filled'
          >
            User Created (...redirecting to Users List)
          </Alert>
        ) : null}
        <div className={classes.CreateUserContainer}>
          <p>CREATE USER</p>

          <form>
            <p>Name*</p>
            <input
              type='text'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <p>E-mail*</p>
            <input
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <p>Password*</p>
            <input
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <p>Confirm Password*</p>
            <input
              type='password'
              value={confirmpassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <p>
              Select Role:-
              <select
                value={isAdmin}
                onChange={(e) =>
                  setIsAdmin(e.target.value === 'true' ? true : false)
                }
              >
                <option value='true'>Admin</option>
                <option value='false'>User</option>
              </select>
            </p>
            <span>
              <button
                className={classes.CancelButton}
                onClick={() => history.push('/users')}
              >
                Cancel
              </button>
              <button onClick={(e) => createUserHandler(e)}>
                {loadingCreateUser ? (
                  <CircularProgress color='white' size={24} thickness={5} />
                ) : (
                  'Create User'
                )}
              </button>
            </span>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateUser;
