import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import { useHistory } from 'react-router-dom';
import { Close } from '@material-ui/icons';
import { Alert } from '@material-ui/lab';

import classes from './DeleteUserModal.module.scss';
import { deleteUserAction } from '../../../Store/Actions/UserActions';
import { DELETE_USER_RESET } from '../../../Store/Actions/ActionTypes';
import { CircularProgress } from '@material-ui/core';

//######
const DeleteUserModal = ({ closeModal, user, successDelete, history }) => {
  //initialize
  const dispatch = useDispatch();

  const { loading, error, success } = useSelector(
    (state) => state.user.deleteUser
  );

  if (success) {
    setTimeout(() => {
      dispatch({
        type: DELETE_USER_RESET,
      });
      successDelete();
      closeModal();
 
    }, 2000);
  }

  return (
    <>
      {error ? (
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
          {error.substring(0, 24)}
        </Alert>
      ) : success ? (
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
          User Deleted
        </Alert>
      ) : null}

      <div className={classes.DeleteModal}>
        <div className={classes.CloseButton} onClick={closeModal}>
          <Close />
        </div>
        <div className={classes.Message}>
          <span>Are you sure you want to delete this User?</span>
          <p>
            <strong>{user.name}</strong> having UserId{' '}
            <strong>{user.id}</strong> will be removed from the database and
            activities related to this user will be permanently deleted.
          </p>
        </div>
        <div className={classes.ButtonWrapper}>
          <button className={classes.CancelButton} onClick={closeModal}>
            Cancel
          </button>
          <button onClick={() => dispatch(deleteUserAction(user.id))}>
            {loading ? (
              <CircularProgress color='white' size={24} thickness={5} />
            ) : (
              'Delete'
            )}
          </button>
        </div>
      </div>
    </>
  );
};

export default DeleteUserModal;
