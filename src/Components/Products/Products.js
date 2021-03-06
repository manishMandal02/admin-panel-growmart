import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CircularProgress, Tooltip } from '@material-ui/core';
import { Alert, Pagination } from '@material-ui/lab';
import { Add, Delete, Edit } from '@material-ui/icons';
import { Helmet } from 'react-helmet';

import { useWindowSize } from '../../Hooks/useWindowSize/useWindowSize';
import classes from './Products.module.scss';
import { getProducts } from '../../Store/Actions/ProductActions';
import { GET_PRODUCT_RESET } from '../../Store/Actions/ActionTypes';
import Modal from '../UI/Modal/Modal';
import DeleteproductModal from './DeleteProduct/DeleteProduct';

//#######
const Products = ({ history, match }) => {
  //initialize
  const dispatch = useDispatch();
  // const history = useHistory();

  const [width] = useWindowSize();

  const pageNumber = match.params.pageNumber || 1;

  //state
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [successDelete, setSuccessDelete] = useState(false);
  const [clickedproduct, setClickedproduct] = useState({
    id: '',
    name: '',
    createdAt: '',
  });

  const { adminInfo } = useSelector((state) => state.user.admin);

  const { products, loading, error, page, pages } = useSelector(
    (state) => state.product.getProducts
  );

  const handlePageChange = (event, value) => {
    history.push(`/products/page/${value}`);
  };

  useEffect(() => {
    if (!adminInfo) {
      history.push('/');
    }
    dispatch(getProducts(pageNumber));
  }, [dispatch, adminInfo, history, pageNumber, successDelete]);

  return (
    <div className={classes.Container}>
      <Helmet>
        <title>Products | GrowMart Admin</title>
      </Helmet>
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
              <th>InStock</th>
              <th>CreatedOn</th>
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
              size={60}
            />
          ) : error ? (
            <Alert severity='error'>{error.substring(0, 80)}</Alert>
          ) : products ? (
            <tbody>
              {products.map((product) => (
                <tr>
                  <td></td>
                  <td className={classes.Id}> {product._id}</td>
                  <td>
                    {product.name.length > 20
                      ? `${product.name.substring(0, 20)}...`
                      : product.name}
                  </td>
                  <td>{product.price}</td>
                  <td>{product.brand}</td>
                  <td>{product.category}</td>
                  <td>{product.countInStock}</td>
                  <td>{product.createdAt.substring(0, 10)}</td>
                  <td>{product.rating}</td>
                  <td>
                    <div className={classes.ButtonWrapper}>
                      <Tooltip title='Edit product' placement='top' arrow>
                        <button
                          onClick={() => {
                            dispatch({
                              type: GET_PRODUCT_RESET,
                            });
                            history.push(`/products/edit/${product._id}`);
                          }}
                        >
                          <Edit />
                        </button>
                      </Tooltip>
                      <Tooltip title='Delete product' placement='top' arrow>
                        <button
                          onClick={() => {
                            setClickedproduct({
                              id: product._id,
                              name: product.name,
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
        className={classes.Addproduct}
        onClick={() => history.push('/products/create')}
      >
        <Tooltip title='Add Product' placement='left'>
          <button>
            <Add /> {width > 900 && 'Add product'}
          </button>
        </Tooltip>
      </div>
    </div>
  );
};

export default Products;
