import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import { useHistory } from 'react-router-dom';
import { Close } from '@material-ui/icons';
import { Alert } from '@material-ui/lab';

import classes from './OrderDetailsModal.module.scss';
import { deleteUserAction } from '../../../Store/Actions/UserActions';
import { CircularProgress } from '@material-ui/core';

//######
const OrderDetailsModal = ({ closeModal, history }) => {
  //initialize
  const dispatch = useDispatch();

  const { loading, error, orderDetails } = useSelector(
    (state) => state.order.orderDetails
  );

  //   if (success) {
  //     setTimeout(() => {
  //       dispatch({
  //         type: DELETE_USER_RESET,
  //       });
  //       closeModal();
  //     }, 2000);
  //   }

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
      ) : orderDetails ? (
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
            <strong>{}</strong> having UserId <strong>{}</strong> will be
            removed from the database and activities related to this user will
            be permanently deleted.
          </p>
        </div>
        <div className={classes.ButtonWrapper}>
          <button className={classes.CancelButton} onClick={closeModal}>
            Cancel
          </button>
          <button onClick={() => dispatch(deleteUserAction())}>
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

export default OrderDetailsModal;
