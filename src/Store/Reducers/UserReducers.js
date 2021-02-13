import { combineReducers } from 'redux';
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
  UPDATE_USER_RESET,
} from '../Actions/ActionTypes';

const adminLogin = (state = {}, action) => {
  switch (action.type) {
    case ADMIN_LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ADMIN_LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        adminInfo: action.payload,
      };
    case ADMIN_LOGIN_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case ADMIN_LOGOUT:
      return {};
    default:
      return state;
  }
};

const getUsersReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case GET_USERS_REQUEST:
      return {
        loading: true,
      };
    case GET_USERS_SUCCESS:
      return {
        loading: false,
        users: action.payload,
      };
    case GET_USERS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

const updateuserReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_USER_REQUEST:
      return {
        loading: true,
      };
    case UPDATE_USER_SUCCESS:
      return {
        loading: false,
        success: true,
        user: action.payload,
      };
    case UPDATE_USER_FAIL:
      return {
        loading: false,
        success: false,
        error: action.payload,
      };
    case UPDATE_USER_RESET:
      return {};
    default:
      return state;
  }
};

export const usersReducer = combineReducers({
  getUsers: getUsersReducer,
  admin: adminLogin,
  updateUser: updateuserReducer,
});
