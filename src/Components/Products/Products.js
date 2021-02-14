import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { CircularProgress, Tooltip } from '@material-ui/core';
import { Alert, Pagination } from '@material-ui/lab';
import { Add, Delete, Edit } from '@material-ui/icons';

import classes from './Products.module.scss';
import { getProducts } from '../../Store/Actions/ProductActions';
import Modal from '../UI/Modal/Modal';
import DeleteproductModal from './DeleteProduct/DeleteProduct';

//#######
const Products = () => {
  //initialize
  const dispatch = useDispatch();
  const history = useHistory();

  //state
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [successDelete, setSuccessDelete] = useState(false);
  const [clickedproduct, setClickedproduct] = useState({
    id: '',
    name: '',
    createdAt: '',
  });

  const { adminInfo } = useSelector((state) => state.user.admin);

  const { products, loading, error } = useSelector(
    (state) => state.product.getProducts
  );

  useEffect(() => {
    if (!adminInfo) {
      history.push('/');
    }
    dispatch(getProducts());
  }, [dispatch, adminInfo, history, successDelete]);

  return (
    <div className={classes.Container}>
      <div className={classes.productsList}>
        <table>
          <thead>
            <tr>
              <th></th>
              <th>Id</th>
              <th>Name</th>
              <th>Price</th>
              <th>Brand</th>
              <th>Category</th>
              <th>Rating</th>
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
          ) : products ? (
            <tbody>
              {products.map((product) => (
                <tr>
                  <td></td>
                  <td className={classes.Id}> {product._id}</td>
                  <td className={classes.Name}>
                    {product.name.length > 15
                      ? `${product.name.substring(0, 13)}...`
                      : product.name}
                  </td>
                  <td>{product.price}</td>
                  <td>{product.brand}</td>
                  <td>{product.category}</td>
                  <td>{product.rating}</td>
                  <td>
                    <div className={classes.ButtonWrapper}>
                      <Tooltip title='Edit product' placement='top' arrow>
                        <button
                          onClick={() =>
                            history.push(`/products/edit/${product._id}`)
                          }
                        >
                          <Edit />
                        </button>
                      </Tooltip>
                      <Tooltip title='Delete product' placement='top' arrow>
                        <button
                          onClick={() => {
                            setClickedproduct({
                              id: product._id,
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
          show={showDeleteModal}
          updateModalState={() => setShowDeleteModal(false)}
        >
          <DeleteproductModal
            show={showDeleteModal}
            closeModal={() => setShowDeleteModal(false)}
            product={clickedproduct}
            successDelete={() => setSuccessDelete(successDelete ? false : true)}
          />
        </Modal>
        <div className={classes.Pagination}>
          <Pagination
            count={10}
            color='primary'
            variant='outlined'
            shape='rounded'
            size='large'
          />
        </div>
      </div>
      <div
        className={classes.Addproduct}
        onClick={() => history.push('/products/create')}
      >
        <button>
          <Add /> Add product
        </button>
      </div>
    </div>
  );
};

export default Products;
