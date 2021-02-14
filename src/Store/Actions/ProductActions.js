import axios from 'axios';
import {
  CREATE_PRODUCT_FAIL,
  CREATE_PRODUCT_REQUEST,
  CREATE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAIL,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  GET_PRODUCTSLIST_ERROR,
  GET_PRODUCTSLIST_REQUEST,
  GET_PRODUCTSLIST_SUCCESS,
  UPDATE_PRODUCT_FAIL,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_SUCCESS,
} from './ActionTypes';

export const getProducts = () => async (dispatch) => {
  try {
    dispatch({
      type: GET_PRODUCTSLIST_REQUEST,
    });
    const { data } = await axios.get('/api/products');

    dispatch({
      type: GET_PRODUCTSLIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_PRODUCTSLIST_ERROR,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//Update product
export const updateProductAction = (id, { name }) => async (
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

    await axios.post(`/api/products/${id}`, { name }, config);

    dispatch({
      type: UPDATE_PRODUCT_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_PRODUCT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//Delete product
export const deleteProductAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: DELETE_PRODUCT_REQUEST,
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

    await axios.get(`/api/products/${id}`, config);

    dispatch({
      type: DELETE_PRODUCT_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: DELETE_PRODUCT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//Delete product
export const createProductAction = ({ name }) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CREATE_PRODUCT_REQUEST,
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

    await axios.post(`/api/products/`, { name }, config);

    dispatch({
      type: CREATE_PRODUCT_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: CREATE_PRODUCT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
