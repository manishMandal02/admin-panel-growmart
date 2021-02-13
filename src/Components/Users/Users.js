import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { CircularProgress, Snackbar, Tooltip } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { Delete, Edit } from '@material-ui/icons';

import classes from './Users.module.scss';
import { getUsersAction } from '../../Store/Actions/UserActions';
import EditUser from './EditUser/EditUser';
import Modal from '../UI/Modal/Modal';
import DeleteUserModal from './DeleteUserModal/DeleteUserModal';
import { UPDATE_USER_RESET } from '../../Store/Actions/ActionTypes';

//#######
const Users = () => {
  //state
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [success, setSuccess] = useState(false);
  const [snackbarShow, setSnackbarShow] = useState(false);
  const [clickedUser, setClickedUser] = useState({
    name: '',
    email: '',
    id: '',
    role: '',
    createdAt: '',
    isAdmin: false,
  });

  const dispatch = useDispatch();
  const history = useHistory();

  if (success) {
    dispatch({
      type: UPDATE_USER_RESET,
    });
  }

  const { adminInfo } = useSelector((state) => state.user.admin);

  // const user = useSelector((state) => state.user.updateUser);

  const { users, loading, error } = useSelector((state) => state.user.getUsers);

  useEffect(() => {
    if (!adminInfo) {
      history.push('/');
    }
    dispatch(getUsersAction());
  }, [dispatch, adminInfo, history, success]);

  //delete user handler
  const deleteUserHandler = (e) => {
    // e.stopPropagation();
  };
  return (
    <div className={classes.Container}>
      <div className={classes.UsersList}>
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Created On</th>
              <th></th>
            </tr>
          </thead>
          {loading ? (
            <CircularProgress
              style={{
                position: 'absolute',
                left: '45%',
                top: '35%',
              }}
              size={40}
            />
          ) : error ? (
            <Alert severity='error'>{error}</Alert>
          ) : users ? (
            <tbody>
              {users.map((user) => (
                <tr>
                  <td>{user._id}</td>
                  <td className={classes.Name}>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.isAdmin ? 'Admin' : 'User'}</td>
                  <td>{user.createdAt.substring(0, 10)}</td>
                  <td>
                    <div className={classes.ButtonWrapper}>
                      <Tooltip title='Edit User' placement='top' arrow>
                        <button
                          onClick={() => {
                            setClickedUser({
                              name: user.name,
                              email: user.email,
                              id: user._id,
                              createdAt: user.createdAt.substring(0, 10),
                              isAdmin: user.isAdmin,
                            });
                            setShowEditModal(true);
                          }}
                        >
                          <Edit />
                        </button>
                      </Tooltip>
                      <Tooltip title='Delete User' placement='top' arrow>
                        <button
                          onClick={() => {
                            setClickedUser({
                              name: user.name,
                              id: user._id,
                              createdAt: user.createdAt.substring(0, 10),
                            });
                            setShowDeleteModal(true);
                          }}
                        >
                          <Delete />
                        </button>
                      </Tooltip>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          ) : null}
        </table>
        <Modal
          show={showEditModal}
          updateModalState={() => setShowEditModal(false)}
        >
          <EditUser
            show={showEditModal}
            closeModal={() => setShowEditModal(false)}
            user={clickedUser}
            successUpdate={() => setSuccess(success ? false : true)}
          />
        </Modal>
        <Modal
          show={showDeleteModal}
          updateModalState={() => setShowDeleteModal(false)}
        >
          <DeleteUserModal
            show={showDeleteModal}
            closeModal={() => setShowDeleteModal(false)}
            user={clickedUser}
          />
        </Modal>
      </div>
      <Snackbar
        open={snackbarShow}
        autoHideDuration={2000}
        onClose={() => setSnackbarShow(false)}
      >
        <Alert severity='success'>This is a success message!</Alert>
      </Snackbar>
    </div>
  );
};

export default Users;
