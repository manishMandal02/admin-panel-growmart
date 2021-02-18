import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import { useHistory } from 'react-router-dom';
import { Close } from '@material-ui/icons';
import { Alert } from '@material-ui/lab';

import classes from './DeleteProduct.module.scss';
import { deleteProductAction } from '../../../Store/Actions/ProductActions';
import { DELETE_PRODUCT_RESET } from '../../../Store/Actions/ActionTypes';
import { CircularProgress } from '@material-ui/core';

//######
const DeleteproductModal = ({ closeModal, product, successDelete }) => {
  //initialize
  const dispatch = useDispatch();

  const { loading, error, success } = useSelector(
    (state) => state.product.deleteProduct
  );

  if (success) {
    setTimeout(() => {
      dispatch({
        type: DELETE_PRODUCT_RESET,
      });
      successDelete();
      closeModal();
    }, 2000);
  }

  return (
    <>
      {error ? (
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
          {error.substring(0, 48)}
        </Alert>
      ) : success ? (
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
          Product Deleted
        </Alert>
      ) : null}

      <div className={classes.DeleteModal}>
        <div className={classes.CloseButton} onClick={closeModal}>
          <Close />
        </div>
        <div className={classes.Message}>
          <span>Are you sure you want to delete this Product?</span>
          <p>
            <strong>{product.name.length > 15
                      ? `${product.name.substring(0, 20)}...`
                      : product.name}</strong> having productId{' '}
            <strong>{product.id}</strong> will be deleted from the database permanently.
          </p>
        </div>
        <div className={classes.ButtonWrapper}>
          <button className={classes.CancelButton} onClick={closeModal}>
            Cancel
          </button>
          <button onClick={() => dispatch(deleteProductAction(product.id))}>
            {loading ? (
              <CircularProgress color='white' size={24} thickness={5} />
            ) : (
              'Delete'
            )}
          </button>
        </div>
      </div>
    </>
  );
};

export default DeleteproductModal;
