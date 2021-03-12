import axios from 'axios';
import {
  GET_ORDERSLIST_SUCCESS,
  GET_ORDERSLIST_REQUEST,
  GET_ORDERSLIST_ERROR,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_ORDER_SUCCESS,
  UPDATE_ORDER_FAIL,
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  GET_ORDER_ERROR,
} from './ActionTypes';

//get all orders
export const getOrders = (pageNumber) => async (dispatch, getState) => {
  try {
    dispatch({
      type: GET_ORDERSLIST_REQUEST,
    });

    const {
      user: { admin },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${admin.adminInfo.token}`,
      },
    };

    const { data } = await axios.get(
      `/api/orders?pageNumber=${pageNumber}`,
      config
    );

    dispatch({
      type: GET_ORDERSLIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_ORDERSLIST_ERROR,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//get all orders
export const getOrderById = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: GET_ORDER_REQUEST,
    });

    const {
      user: { admin },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${admin.adminInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/orders/${id}`, config);

    dispatch({
      type: GET_ORDER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_ORDER_ERROR,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//update  order
export const updateOrderAction = (id, { isPaid, isDelivered }) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: UPDATE_PRODUCT_REQUEST,
    });

    const {
      user: { admin },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${admin.adminInfo.token}`,
      },
    };

    const { data } = await axios.post(
      `/api/orders/update/${id}`,
      { isPaid, isDelivered },
      config
    );

    dispatch({
      type: UPDATE_ORDER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_ORDER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
