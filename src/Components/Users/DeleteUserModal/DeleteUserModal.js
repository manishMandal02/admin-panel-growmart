import { Close } from '@material-ui/icons';
import React from 'react';

import classes from './DeleteUserModal.module.scss';

//######
const DeleteUserModal = ({ show, closeModal, user, deleteUser }) => {
  //state

  return show ? (
    <div className={classes.DeleteModal}>
      <div className={classes.CloseButton} onClick={closeModal}>
        <Close />
      </div>
      <div className={classes.Message}>
        <span>Are you sure you want to delete this User?</span>
        <p>
          <strong>{user.name}</strong> having UserId <strong>{user.id}</strong>{' '}
          will be removed from the database and activities related to this user
          will be permanently deleted.
        </p>
      </div>
      <div className={classes.ButtonWrapper}>
        <button className={classes.CancelButton} onClick={closeModal}>
          Cancel
        </button>
        <button onClick={deleteUser}>Delete</button>
      </div>
    </div>
  ) : null;
};

export default DeleteUserModal;
