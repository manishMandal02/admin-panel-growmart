import { CircularProgress, Snackbar } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Modal from '../../UI/Modal/Modal';

import classes from './EditUser.module.scss';
import { updateUser } from '../../../Store/Actions/UserActions';
import { Alert } from '@material-ui/lab';

const EditUser = ({ show, closeModal, user, successUpdate }) => {
  //Initialize
  const dispatch = useDispatch();
  //state
  const [email, setEmail] = useState(user.email);
  const [name, setName] = useState(user.name);
  const [isAdmin, setIsAdmin] = useState(user.isAdmin);

  const { loading, error, success } = useSelector(
    (state) => state.user.updateUser
  );
  if (success) {
    setTimeout(() => {
      successUpdate();
      closeModal();
    }, 2000);
  }
  console.log(isAdmin);
  //update user handler
  const updateUserHandler = (e) => {
    e.preventDefault();
    if (
      email !== user.email ||
      name !== user.name ||
      isAdmin !== user.isAdmin
    ) {
      dispatch(updateUser(user.id, { name, email, isAdmin }));
    } else {
      closeModal();
    }
  };

  return show ? (
    <div className={classes.Container} onClick={(e) => e.stopPropagation()}>
      <p>EDIT USER</p>

      {error ? (
        <Alert severity='error' variant='outlined'></Alert>
      ) : (
        <div className={classes.UserInfo}>
          <p className={classes.UserID}>
            UserId:-<span>{user.id}</span>{' '}
          </p>
        </div>
      )}

      <form>
        <p>Name</p>
        <input
          type='text'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <p>E-mail</p>
        <input
          type='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
          <button className={classes.CancelButton} onClick={closeModal}>
            Cancel
          </button>
          <button onClick={(e) => updateUserHandler(e)}>
            {loading ? (
              <CircularProgress color='white' size={24} thickness={5} />
            ) : (
              'Save Changes'
            )}
          </button>
        </span>
      </form>
    </div>
  ) : null;
};

export default EditUser;
