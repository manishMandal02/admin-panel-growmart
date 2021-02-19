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
  CREATE_USER_SUCCESS,
  CREATE_USER_REQUEST,
  CREATE_USER_FAIL,
  CREATE_USER_RESET,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAIL,
  DELETE_USER_RESET,
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
        users: action.payload.users,
        page: action.payload.page,
        pages: action.payload.pages
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

const createUserReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_USER_REQUEST:
      return {
        loading: true,
      };
    case CREATE_USER_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case CREATE_USER_FAIL:
      return {
        loading: false,
        success: false,
        error: action.payload,
      };
    case CREATE_USER_RESET:
      return {};
    default:
      return state;
  }
};

const deleteeUserReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_USER_REQUEST:
      return {
        loading: true,
      };
    case DELETE_USER_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case DELETE_USER_FAIL:
      return {
        loading: false,
        success: false,
        error: action.payload,
      };
    case DELETE_USER_RESET:
      return {};
    default:
      return state;
  }
};

export const usersReducer = combineReducers({
  getUsers: getUsersReducer,
  admin: adminLogin,
  updateUser: updateuserReducer,
  createUser: createUserReducer,
  deleteUser: deleteeUserReducer,
});
