import { combineReducers } from 'redux';

import {
  GET_ORDERSLIST_SUCCESS,
  GET_ORDERSLIST_REQUEST,
  GET_ORDERSLIST_ERROR,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_ORDER_SUCCESS,
  UPDATE_ORDER_FAIL,
  UPDATE_ORDER_RESET,
  GET_ORDER_RESET,
  GET_ORDER_ERROR,
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
} from '../Actions/ActionTypes';

export const getordersReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case GET_ORDERSLIST_REQUEST:
      return {
        orders: [],
        loading: true,
      };
    case GET_ORDERSLIST_SUCCESS:
      return {
        loading: false,
        orders: action.payload.orders,
        page: action.payload.page,
        pages: action.payload.pages,
      };
    case GET_ORDERSLIST_ERROR:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const getorderByIdReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_ORDER_REQUEST:
      return {
        loading: true,
      };
    case GET_ORDER_SUCCESS:
      return {
        loading: false,
        orderDetails: action.payload,
      };
    case GET_ORDER_ERROR:
      return {
        loading: false,
        error: action.payload,
      };
    case GET_ORDER_RESET:
      return {};
    default:
      return state;
  }
};

export const updateOrderReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_PRODUCT_REQUEST:
      return {
        loading: true,
      };
    case UPDATE_ORDER_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case UPDATE_ORDER_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case UPDATE_ORDER_RESET:
      return {};
    default:
      return state;
  }
};

export const OrderReducer = combineReducers({
  getOrders: getordersReducer,
  updateOrder: updateOrderReducer,
  orderDetails: getorderByIdReducer,
});
