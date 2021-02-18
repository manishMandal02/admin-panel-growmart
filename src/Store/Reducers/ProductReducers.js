import { combineReducers } from 'redux';
import {
  CREATE_PRODUCT_FAIL,
  CREATE_PRODUCT_REQUEST,
  CREATE_PRODUCT_RESET,
  CREATE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAIL,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_RESET,
  DELETE_PRODUCT_SUCCESS,
  GET_PRODUCTSLIST_ERROR,
  GET_PRODUCTSLIST_REQUEST,
  GET_PRODUCTSLIST_SUCCESS,
  GET_PRODUCT_ERROR,
  GET_PRODUCT_REQUEST,
  GET_PRODUCT_RESET,
  GET_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_FAIL,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_RESET,
  UPDATE_PRODUCT_SUCCESS,
} from '../Actions/ActionTypes';

export const getproductsReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case GET_PRODUCTSLIST_REQUEST:
      return {
        products: [],
        loading: true,
      };
    case GET_PRODUCTSLIST_SUCCESS:
      return {
        loading: false,
        products: action.payload,
      };
    case GET_PRODUCTSLIST_ERROR:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const getproductByIdReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_PRODUCT_REQUEST:
      return {
        loading: true,
      };
    case GET_PRODUCT_SUCCESS:
      return {
        loading: false,
        product: action.payload,
      };
    case GET_PRODUCT_ERROR:
      return {
        loading: false,
        error: action.payload,
      };
    case GET_PRODUCT_RESET:
      return {};
    default:
      return state;
  }
};

export const updateProductReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_PRODUCT_REQUEST:
      return {
        loading: true,
      };
    case UPDATE_PRODUCT_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case UPDATE_PRODUCT_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case UPDATE_PRODUCT_RESET:
      return {};
    default:
      return state;
  }
};

export const deleteProductReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_PRODUCT_REQUEST:
      return {
        loading: true,
      };
    case DELETE_PRODUCT_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case DELETE_PRODUCT_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case DELETE_PRODUCT_RESET:
      return {};
    default:
      return state;
  }
};

export const createProductReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_PRODUCT_REQUEST:
      return {
        loading: true,
      };
    case CREATE_PRODUCT_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case CREATE_PRODUCT_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CREATE_PRODUCT_RESET:
      return {};
    default:
      return state;
  }
};

export const productsReducer = combineReducers({
  getProductById: getproductByIdReducer,
  getProducts: getproductsReducer,
  updateProduct: updateProductReducer,
  deleteProduct: deleteProductReducer,
  createProduct: createProductReducer,
});
