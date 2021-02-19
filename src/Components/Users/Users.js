import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { CircularProgress, Tooltip } from '@material-ui/core';
import { Alert, Pagination } from '@material-ui/lab';
import { Add, Delete, Edit } from '@material-ui/icons';

import classes from './Users.module.scss';
import { getUsersAction } from '../../Store/Actions/UserActions';
import EditUser from './EditUser/EditUser';
import Modal from '../UI/Modal/Modal';
import DeleteUserModal from './DeleteUserModal/DeleteUserModal';
import { Helmet } from 'react-helmet';

//#######
const Users = ({ match }) => {
  //initialize
  const dispatch = useDispatch();
  const history = useHistory();

  const pageNumber = match.params.pageNumber || 1;

  //state
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [successUpdate, setSuccessUpdate] = useState(false);
  const [successDelete, setSuccessDelete] = useState(false);
  const [clickedUser, setClickedUser] = useState({
    name: '',
    email: '',
    id: '',
    role: '',
    createdAt: '',
    isAdmin: false,
  });
  //change page
  //  const [page, setPage] = React.useState(1);
  const handlePageChange = (event, value) => {
    // console.log(event)
    history.push(`/users/page/${value}`);
  };

  const { adminInfo } = useSelector((state) => state.user.admin);

  const { users, loading, error, pages, page } = useSelector(
    (state) => state.user.getUsers
  );

  useEffect(() => {
    if (!adminInfo) {
      history.push('/');
    }

    dispatch(getUsersAction(pageNumber));
  }, [dispatch, adminInfo, history, successUpdate, successDelete, pageNumber]);

  return (
    <div className={classes.Container}>
      <Helmet>
        <title> Users | GrowMart Admin</title>
      </Helmet>
      <div className={classes.UsersList}>
        <table>
          <thead>
            <tr>
              <th></th>
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
                  <td></td>
                  <td className={classes.Id}> {user._id}</td>
                  <td className={classes.Name}>
                    {user.name.length > 15
                      ? `${user.name.substring(0, 13)}...`
                      : user.name}
                  </td>
                  <td className={classes.Email}>
                    {user.email.length > 19
                      ? ` ${user.email.substring(0, 20)}..`
                      : user.email}
                  </td>
                  <td>{user.isAdmin ? 'Admin' : 'User'}</td>
                  <td className={classes.CreatedDate}>
                    {user.createdAt.substring(0, 10)}
                  </td>
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
            successUpdate={() => setSuccessUpdate(successUpdate ? false : true)}
          />
        </Modal>
        <Modal
          show={showDeleteModal}
          updateModalState={() => setShowDeleteModal(false)}
        >
          <DeleteUserModal
            show={showDeleteModal}
            // history={history}
            closeModal={() => setShowDeleteModal(false)}
            user={clickedUser}
            successDelete={() => setSuccessDelete(successDelete ? false : true)}
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
      <div
        className={classes.AddUser}
        onClick={() => history.push('/users/create')}
      >
        <button>
          <Add /> Add User
        </button>
      </div>
    </div>
  );
};

export default Users;
