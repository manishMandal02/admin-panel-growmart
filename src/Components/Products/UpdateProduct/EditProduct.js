import React, { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { CircularProgress, Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { ArrowBack, CameraAltOutlined, CloudUpload } from '@material-ui/icons';
import {
  updateProductAction,
  getProductById,
} from '../../../Store/Actions/ProductActions';
import { UPDATE_PRODUCT_RESET } from '../../../Store/Actions/ActionTypes';

import classes from './EditProduct.module.scss';
import { Helmet } from 'react-helmet';

const CreateProduct = ({ history, match }) => {
  //initialize
  const dispatch = useDispatch();

  const id = match.params.id;

  const { loading: productLoading, error: productError, product } = useSelector(
    (state) => state.product.getProductById
  );
  //state
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [brand, setBrand] = useState('growmart');
  const [category, setCategory] = useState('vegetables');
  const [countInStock, setCountInStock] = useState('');
  const [previewImage, setPreviewImage] = useState('');
  const [imageInput, setImageInput] = useState('');
  const [snackbar, setSnackbar] = useState(false);
  const [snackbar2, setSnackbar2] = useState(false);

  const { loading, error, success } = useSelector(
    (state) => state.product.updateProduct
  );

  // const setStateForInput = (product) => {
  //   setName(product.name)
  //     setDescription(product.description)
  //     setPrice(product.price)
  //     setCountInStock(product.countInStock)
  //     setBrand(product.brand)
  //     setCategory(product.category)
  //     setPreviewImage(product.image)
  // }

  useEffect(() => {
    if (!product || product._id !== id) {
      dispatch(getProductById(id));
    } else {
      setName(product.name);
      setDescription(product.description);
      setPrice(product.price);
      setCountInStock(product.countInStock);
      setBrand(product.brand);
      setCategory(product.category);
      setPreviewImage(product.image);
    }
  }, [id, history, dispatch, product]);

  if (success) {
    setTimeout(() => {
      dispatch({
        type: UPDATE_PRODUCT_RESET,
      });
      history.push('/products');
    }, 2000);
  }

  // uplaoding image handler
  const previewImageHandler = (image) => {
    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onloadend = () => {
      setPreviewImage(reader.result);
    };
  };

  const handelImageInputChange = (e) => {
    const image = e.target.files[0];
    previewImageHandler(image);
    const uploadedImage = new FormData();
    if (image) {
      uploadedImage.append(
        'image',
        image,
        `${name.replace(/[^a-zA-Z ]/g, '')}.jpg`
      );
      setImageInput(uploadedImage);
    }
  };

  //handel product create
  const handelProductCreate = async () => {
    if (
      name !== product.name ||
      description !== product.description ||
      price !== product.price ||
      countInStock !== product.countInStock ||
      brand !== product.brand ||
      category !== product.category ||
      previewImage !== product.image
    ) {
      dispatch(
        updateProductAction(id, {
          name,
          description,
          price,
          countInStock,
          brand,
          category,
          imageInput,
        })
      );
    }

    if (error) {
      setSnackbar2(true);
    } else {
      setSnackbar(true);
      // dispatch({
      //     type: GET_PRODUCT_RESET
      //   })
    }
  };

  return productLoading ? (
    <CircularProgress color='white' size={30} />
  ) : productError ? (
    <Alert severity='error'>{productError.substring(0, 80)}</Alert>
  ) : product ? (
    <>
      <Helmet>
        <title>Edit Product | GrowMart Admin</title>
      </Helmet>
      <div
        className={classes.GoBack}
        onClick={() => {
          history.push('/products');
        }}
      >
        <button>
          <ArrowBack /> Go Back
        </button>
      </div>
      <div className={classes.Wrapper}>
        {success ? (
          <Snackbar
            open={snackbar}
            onClose={() => setSnackbar(false)}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          >
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
              Prodcut Updated (...redirecting to Products List)
            </Alert>
          </Snackbar>
        ) : error ? (
          <Snackbar
            open={snackbar2}
            onClose={() => setSnackbar2(false)}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          >
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
              {error.substring(0, 200)}
            </Alert>
          </Snackbar>
        ) : null}
        <p>Edit PRODUCT</p>
        <div className={classes.CreateProductContainer}>
          <div className={classes.LeftContainer}>
            <p>
              Product Name* <span>(45 character limit)</span>
            </p>
            <input
              type='text'
              value={name}
              required
              maxLength='45'
              onChange={(e) => setName(e.target.value)}
            />
            <p>
              Description* <span>(200 character limit)</span>
            </p>
            <textarea
              rows='6'
              cols='50'
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              maxLength='200'
            >
              {description}
            </textarea>
            <div className={classes.InlineWrapper}>
              <span>
                <p>Price* </p>
                <span className={classes.Price}>
                  <span>$</span>
                  <input
                    type='number'
                    value={price}
                    required
                    maxLength='6'
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </span>
              </span>

              <span>
                <p>Count In Stock* </p>
                <span className={classes.Price}>
                  <span>Q</span>
                  <input
                    type='number'
                    value={countInStock}
                    required
                    maxLength='6'
                    onChange={(e) => setCountInStock(e.target.value)}
                  />
                </span>
              </span>
            </div>

            <p>Brand </p>
            <select value={brand} onChange={(e) => setBrand(e.target.value)}>
              <option value='growmart'>GrowMart</option>
              <option value='nestle'>Nestle</option>
              <option value='marketside'>MarketSide</option>
            </select>

            <p>Category </p>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value='vegetables'>Vegetables</option>
              <option value='fruits'>Fruits</option>
              <option value='leafyVegetables'>Leafy Vegetables</option>
              <option value='freshprepared'>Fresh Prepared</option>
            </select>
          </div>
          <div className={classes.RightContainer}>
            <div className={classes.ImageContainer}>
              <div className={classes.ImagePreview}>
                {!previewImage ? (
                  <p>
                    <span>
                      <CameraAltOutlined />
                    </span>
                    Upload Image to Preview
                  </p>
                ) : (
                  <img src={previewImage} alt='preview' />
                )}
              </div>
              <input
                type='file'
                accept='image/*'
                id='upload-image'
                onChange={(e) => handelImageInputChange(e)}
                hidden
              />
              <label for='upload-image'>
                <CloudUpload /> Upload Image
              </label>
            </div>
          </div>
        </div>
        <div className={classes.ButtonWrapper}>
          {/* <button
            className={classes.Cancel}
            onClick={() => history.push('/products')}
          >
            Cancel
          </button> */}
          <button
            className={classes.AddProductButton}
            onClick={handelProductCreate}
          >
            {loading ? (
              <CircularProgress size={25} color='white' />
            ) : (
              'Update Product Now'
            )}
          </button>
        </div>
      </div>
    </>
  ) : null;
};

export default CreateProduct;
