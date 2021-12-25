import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CircularProgress, Tooltip } from '@material-ui/core';
import { Alert, Pagination } from '@material-ui/lab';
import { Edit, CheckCircle, Cancel, Visibility } from '@material-ui/icons';

import classes from './Orders.module.scss';
import { getOrders } from '../../Store/Actions/OrderActions';
// import { GET_PRODUCT_RESET } from "../../Store/Actions/ActionTypes";
import Modal from '../UI/Modal/Modal';
import OrderDetailsModal from './OrderDetailsModal/OrderDetailsModal';
import UpdateOrder from './EditOrderModal/EditOrderModal';
import { Helmet } from 'react-helmet';

//#######
const Order = ({ history, match }) => {
  //initialize
  const dispatch = useDispatch();
  // const history = useHistory();

  const pageNumber = match.params.pageNumber || 1;

  //state
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [successUpdate, setSuccessUpdate] = useState(false);
  const [clickedOrder, setclickedOrder] = useState({});

  const { adminInfo } = useSelector((state) => state.user.admin);

  const { orders, loading, error, page, pages } = useSelector((state) => state.order.getOrders);

  const handlePageChange = (event, value) => {
    history.push(`/orders/page/${value}`);
  };

  useEffect(() => {
    if (!adminInfo) {
      history.push('/');
    }
    dispatch(getOrders(pageNumber));
  }, [dispatch, adminInfo, history, pageNumber, successUpdate]);

  return (
    <div className={classes.Container}>
      <Helmet>
        <title>Orders | GrowMart Admin</title>
      </Helmet>
      <div className={classes.productsList}>
        <table>
          <thead>
            <tr>
              <th></th>
              <th>Order Id</th>
              <th>Ordered By</th>
              <th>Items</th>
              <th>Total</th>
              <th>Date</th>
              <th>Paid</th>
              <th>Delivered</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          {loading ? (
            <CircularProgress
              style={{
                position: 'absolute',
                left: '45%',
                top: '35%',
              }}
              size={50}
            />
          ) : error ? (
            <Alert severity='error'>{error.substring(0, 80)}</Alert>
          ) : orders ? (
            <tbody>
              {orders.map((order) => (
                <tr>
                  <td></td>
                  <td className={classes.Id}> {order._id}</td>
                  <td className={classes.Name}>
                    {order.user.name.length > 15 ? `${order.user.name.substring(0, 13)}...` : order.user.name}
                  </td>
                  <td>{order.orderItems.length}</td>
                  <td>{order.totalPrice}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>
                    {order.isPaid ? <CheckCircle color='primary' /> : <Cancel style={{ color: '#E0472C' }} />}
                  </td>
                  <td>
                    {order.isDelivered ? (
                      <CheckCircle color='primary' />
                    ) : (
                      <Cancel style={{ color: '#E0472C' }} />
                    )}
                  </td>
                  <td>
                    {!order.isPaid && !order.isDelivered ? (
                      <div className={classes.PaymentPending}>
                        <p>Payment Pending</p>
                        <div className={classes.ProgressBar}>
                          <div style={{ width: '10%' }}></div>
                        </div>
                      </div>
                    ) : order.isPaid && !order.isDelivered ? (
                      <div className={classes.OrderProcessing}>
                        <p>Order Processing</p>
                        <div className={classes.ProgressBar}>
                          <div style={{ width: '60%' }}></div>
                        </div>
                      </div>
                    ) : (
                      <div className={classes.OrderCompleted}>
                        <p>Order Completed</p>
                        <div className={classes.ProgressBar}>
                          <div style={{ width: '100%' }}></div>
                        </div>
                      </div>
                    )}
                  </td>
                  <td>
                    <div className={classes.ButtonWrapper}>
                      <Tooltip title='Update Status' placement='top' arrow>
                        <button
                          onClick={() => {
                            setclickedOrder({
                              id: order._id,
                              isPaid: order.isPaid,
                              isDelivered: order.isDelivered,
                            });
                            setShowUpdateModal(true);
                          }}
                        >
                          <Edit />
                        </button>
                      </Tooltip>
                      <Tooltip title='View Order Details' placement='top' arrow>
                        <button
                          onClick={() => {
                            setclickedOrder({
                              id: order._id,
                            });
                            setShowOrderModal(true);
                          }}
                        >
                          <Visibility />
                        </button>
                      </Tooltip>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          ) : null}
        </table>
        <Modal show={showOrderModal} updateModalState={() => setShowOrderModal(false)}>
          <OrderDetailsModal
            show={showOrderModal}
            closeModal={() => setShowOrderModal(false)}
            order={clickedOrder}
          />
        </Modal>
        <Modal show={showUpdateModal} updateModalState={() => setShowUpdateModal(false)}>
          <UpdateOrder
            show={showUpdateModal}
            closeModal={() => setShowUpdateModal(false)}
            order={clickedOrder}
            successUpdate={() => setSuccessUpdate(successUpdate ? false : true)}
          />
        </Modal>
        <div className={classes.Pagination}>
          <Pagination
            color='primary'
            variant='outlined'
            shape='rounded'
            size='large'
            boundryCount={1}
            page={page}
            count={pages}
            onChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default Order;
