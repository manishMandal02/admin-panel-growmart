import { CircularProgress } from '@material-ui/core';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import classes from './EditOrderModal.module.scss';
import { updateOrderAction } from '../../../Store/Actions/OrderActions';
import { Alert } from '@material-ui/lab';
import { UPDATE_ORDER_RESET } from '../../../Store/Actions/ActionTypes';

//#############//#####
const UpdateOrder = ({ show, closeModal, order, successUpdate }) => {
  //Initialize
  const dispatch = useDispatch();
  //state
  const [isPaid, setIsPaid] = useState(order.isPaid);
  const [isDelivered, setIsDelivered] = useState(order.isDelivered);

  const { loading, error, success } = useSelector(
    (state) => state.order.updateOrder
  );
  if (success) {
    setTimeout(() => {
      dispatch({
        type: UPDATE_ORDER_RESET,
      });
      successUpdate();
      closeModal();
    }, 2000);
  }
  //update order handler
  const updateorderHandler = (e) => {
    e.preventDefault();
    if (isPaid !== order.isPaid || isDelivered !== order.isDelivered) {
      dispatch(updateOrderAction(order.id, { isPaid, isDelivered }));
    } else {
      closeModal();
    }
  };

  return show ? (
    <div className={classes.Container} onClick={(e) => e.stopPropagation()}>
      <p>EDIT ORDER</p>

      {error ? (
        <Alert
          style={{ margin: '0 0.6em ' }}
          severity='error'
          variant='outlined'
        >
          {error.substring(0, 30)}
        </Alert>
      ) : success ? (
        <Alert
          style={{ margin: '0 0.6em' }}
          severity='success'
          variant='filled'
        >
          Order Updated
        </Alert>
      ) : (
        <div className={classes.UserInfo}>
          <p className={classes.UserID}>
            OrderId:-<span>{order.id}</span>{' '}
          </p>
        </div>
      )}

      <form>
        <p>Payment</p>
        <select
          value={isPaid}
          onChange={(e) => setIsPaid(e.target.value === 'true' ? true : false)}
        >
          <option value='true'>Paid</option>
          <option value='false'>Not Paid</option>
        </select>
        <p>Delivery</p>
        <select
          value={isDelivered}
          onChange={(e) =>
            setIsDelivered(e.target.value === 'true' ? true : false)
          }
        >
          <option value='true'>Delivered</option>
          <option value='false'>Not Delivered</option>
        </select>

        <span>
          <button className={classes.CancelButton} onClick={closeModal}>
            Cancel
          </button>
          <button onClick={(e) => updateorderHandler(e)}>
            {loading ? (
              <CircularProgress color='white' size={24} thickness={5} />
            ) : (
              'Update Order'
            )}
          </button>
        </span>
      </form>
    </div>
  ) : null;
};

export default UpdateOrder;
