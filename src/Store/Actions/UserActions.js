import axios from 'axios';
import {
  GET_USERS_REQUEST,
  GET_USERS_SUCCESS,
  GET_USERS_FAIL,
  ADMIN_LOGIN_FAIL,
  ADMIN_LOGIN_REQUEST,
  ADMIN_LOGIN_SUCCESS,
  ADMIN_LOGOUT,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAIL,
  DELETE_USER_SUCCESS,
  DELETE_USER_REQUEST,
  DELETE_USER_FAIL,
  CREATE_USER_FAIL,
  CREATE_USER_REQUEST,
  CREATE_USER_SUCCESS,
  ADMIN_UPDATE_REQUEST,
  ADMIN_UPDATE_SUCCESS,
  ADMIN_UPDATE_FAIL,
} from '../Actions/ActionTypes';

//Admin Login Action
export const adminLogin = ({ email, password }) => async (dispatch) => {
  try {
    dispatch({
      type: ADMIN_LOGIN_REQUEST,
    });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.post(
      '/api/users/login',
      { email, password },
      config
    );

    dispatch({
      type: ADMIN_LOGIN_SUCCESS,
      payload: data,
    });

    localStorage.setItem('adminInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: ADMIN_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//Admin Logout Action
export const adminLogout = () => async (dispatch) => {
  dispatch({
    type: ADMIN_LOGOUT,
  });
  await localStorage.removeItem('adminInfo');
};

//Admin Login Action
export const adminUpdateAction = ({ name, email, password }) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: ADMIN_UPDATE_REQUEST,
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

    const { data } = await axios.put(
      '/api/users/profile',
      { name, email, password },
      config
    );

    console.log(data);
    dispatch({
      type: ADMIN_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//GET all users
export const getUsersAction = (pageNumber) => async (dispatch, getState) => {
  try {
    dispatch({
      type: GET_USERS_REQUEST,
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
      `/api/users?pageNumber=${pageNumber}`,

      config
    );

    dispatch({
      type: GET_USERS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_USERS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//Update user
export const updateUser = (id, { name, email, isAdmin }) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: UPDATE_USER_REQUEST,
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
      `/api/users/${id}`,
      { name, email, isAdmin },
      config
    );

    dispatch({
      type: UPDATE_USER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_USER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//Create  users
export const createUserAction = ({
  name,
  email,
  password,
  confirmpassword,
  isAdmin,
}) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CREATE_USER_REQUEST,
    });

    if (password !== confirmpassword) {
      throw new Error('passwords do not match');
    }

    const {
      user: { admin },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${admin.adminInfo.token}`,
      },
    };

    await axios.post(`/api/users/`, { name, email, password, isAdmin }, config);

    dispatch({
      type: CREATE_USER_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: CREATE_USER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//delete  users
export const deleteUserAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: DELETE_USER_REQUEST,
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

    await axios.get(`/api/users/${id}`, config);

    dispatch({
      type: DELETE_USER_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: DELETE_USER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
