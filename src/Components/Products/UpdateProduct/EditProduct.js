import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { CircularProgress } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { ArrowBack } from '@material-ui/icons';
import { createUserAction } from '../../../Store/Actions/UserActions';
import { CREATE_PRODUCT_RESET } from '../../../Store/Actions/ActionTypes';

import classes from './EditProduct.module.scss';

const CreateProduct = ({ history, match }) => {
  //initialize
  const dispatch = useDispatch();
  //   const history = useHistory();

  //state
  //Create user
  const [name, setName] = useState('');

  const {
    loading: loadingCreateProduct,
    error: errorCreateProduct,
    success: successCreateProduct,
  } = useSelector((state) => state.product.createProduct);

  if (successCreateProduct) {
    setTimeout(() => {
      dispatch({
        type: CREATE_PRODUCT_RESET,
      });
      history.push('/products');
    }, 2000);
  }

  //create user handler
  const createUserHandler = (e) => {
    e.preventDefault();
    dispatch(createUserAction({ name }));
  };

  return (
    <>
      <div className={classes.GoBack} onClick={() => history.push('/products')}>
        <button>
          <ArrowBack /> Go Back
        </button>
      </div>
      <div className={classes.Wrapper}>
        {errorCreateProduct ? (
          <Alert
            style={{
              margin: '0 0.6em ',
              height: '7%',
              marginTop: '.4em',
              padding: '-.4em 0 0em .4em',
            }}
            severity='error'
            variant='filled'
          >
            {errorCreateProduct.substring(0, 24)}
          </Alert>
        ) : successCreateProduct ? (
          <Alert
            style={{
              margin: '0 0.6em ',
              height: '7%',
              marginTop: '.4em',
              padding: '-.4em 0 0em .4em',
            }}
            severity='success'
            variant='filled'
          >
            User Created (...redirecting to Users List)
          </Alert>
        ) : null}
        <div className={classes.CreateUserContainer}>
          <p>Add Product</p>

          <form>
            <p>Name*</p>
            <input
              type='text'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            {/* <p>
              Select Role:-
              <select
                value={isAdmin}
                onChange={(e) =>
                  setIsAdmin(e.target.value === 'true' ? true : false)
                }
              >
                <option value='true'>Admin</option>
              </select>
            </p> */}
            <span>
              <button
                className={classes.CancelButton}
                onClick={() => history.push('/products')}
              >
                Cancel
              </button>
              <button onClick={(e) => createUserHandler(e)}>
                {loadingCreateProduct ? (
                  <CircularProgress color='white' size={24} thickness={5} />
                ) : (
                  'Create Product'
                )}
              </button>
            </span>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateProduct;
