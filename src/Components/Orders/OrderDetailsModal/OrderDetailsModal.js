import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import { useHistory } from 'react-router-dom';
import { Alert } from '@material-ui/lab';

import classes from './OrderDetailsModal.module.scss';
import { CircularProgress } from '@material-ui/core';
import { getOrderById } from '../../../Store/Actions/OrderActions';

//######
const OrderDetailsModal = ({ closeModal, order }) => {
  //initialize
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrderById(order.id));
  }, [dispatch, order]);

  const { loading, error, orderDetails } = useSelector(
    (state) => state.order.orderDetails
  );

  return loading ? (
    <CircularProgress size={40} color='primary' />
  ) : error ? (
    <Alert severity='error' variant='filled'>
      {error}
    </Alert>
  ) : orderDetails ? (
    <div className={classes.Container}>
      <div className={classes.LeftWrapper}>
        <span className={classes.LeftContainer}>
          <div className={classes.OrderSummary}>
            <p className={classes.Heading}>
              Order ID: <p className={classes.Content}>{orderDetails._id}</p>
            </p>
            <p className={classes.Heading}>
              SHIPPING ADDRESS:
              <br />
              <p className={classes.User}>
                Name:{' '}
                <p className={classes.Content}>{orderDetails.user.name}</p>
              </p>
              <p className={classes.User}>
                Email:{' '}
                <p className={classes.Content}>{orderDetails.user.email}</p>
              </p>
              <p className={classes.User}>
                Address:
                <p
                  className={classes.Content}
                >{`${orderDetails.shippingAddress.address} 
           ${orderDetails.shippingAddress.city}, ${orderDetails.shippingAddress.postalCode}, ${orderDetails.shippingAddress.country}.`}</p>
              </p>
            </p>
            {orderDetails.isDelivered && orderDetails.isPaid ? (
              <div className={classes.Alert}>
                <Alert severity='success'>
                  <strong>Order Completed</strong>
                </Alert>
              </div>
            ) : !orderDetails.isDelivered && orderDetails.isPaid ? (
              <div className={classes.Alert}>
                <Alert severity='warning'>
                  <strong>Order Processing</strong>
                </Alert>
              </div>
            ) : !orderDetails.isDelivered && !orderDetails.isPaid ? (
              <div className={classes.Alert}>
                <Alert severity='error'>
                  <strong>Payment Pending</strong>
                </Alert>
              </div>
            ) : null}
            <p className={classes.Heading}>
              PAYMENT METHOD:
              <span className={classes.Content}>
                {orderDetails.paymentMethod}
              </span>
            </p>
            {!orderDetails.isPaid ? (
              <div className={classes.Alert}>
                <Alert severity='error'>
                  <strong>Not Paid</strong>
                </Alert>
              </div>
            ) : (
              <div className={classes.Alert}>
                <Alert severity='success'>
                  <strong>Paid</strong>
                </Alert>
              </div>
            )}

            <p
              className={classes.Heading}
            >{`Order ITEMS: (${orderDetails.orderItems.length})`}</p>
            <div className={classes.ItemsList}>
              {orderDetails.orderItems.map((p) => (
                <div className={classes.OrderItems}>
                  <img src={p.image} alt={p.name} />
                  <p>{p.name}</p>
                  <span>{`${p.qty} x ${p.price} = ${p.qty * p.price} `}</span>
                </div>
              ))}
            </div>
          </div>
        </span>
      </div>

      <div className={classes.RightWrapper}>
        <div className={classes.RightContainer}>
          {error ? (
            <div className={classes.Alert}>
              <Alert severity='error'>
                <strong>{error}</strong>
              </Alert>
            </div>
          ) : null}
          <p>Price Details</p>
          <div>
            <p>
              {`Price (${orderDetails.orderItems.length}) ${
                orderDetails.orderItems.length >= 0 ? 'items' : 'item'
              }`}
              <span>${orderDetails.itemsPrice}</span>
            </p>
            <p>
              Tax % <span>${orderDetails.taxPrice}</span>
            </p>
            <p>
              Shipping Charges{' '}
              <span>
                {orderDetails.shippingPrice === 0
                  ? 'Free'
                  : `$${orderDetails.shippingPrice}`}
              </span>
            </p>
            <p>
              Total Amount <span>${orderDetails.totalPrice}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  ) : null;
};

export default OrderDetailsModal;
