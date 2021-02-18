import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { CircularProgress, Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { ArrowBack, CameraAltOutlined, CloudUpload } from '@material-ui/icons';
import { createProductAction } from '../../../Store/Actions/ProductActions';
import { CREATE_PRODUCT_RESET } from '../../../Store/Actions/ActionTypes';

import classes from './CreateProduct.module.scss';

const CreateProduct = ({ history }) => {
  //initialize
  const dispatch = useDispatch();
  //   const history = useHistory();

  //state
  //Create user
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
    (state) => state.product.createProduct
  );

  if (success) {
    setTimeout(() => {
      dispatch({
        type: CREATE_PRODUCT_RESET,
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
    dispatch(
      createProductAction({
        name,
        description,
        price,
        countInStock,
        brand,
        category,
        imageInput,
      })
    );

    if (error) {
      setSnackbar2(true);
    } else {
      setSnackbar(true);
    }
  };

  return (
    <>
      <div className={classes.GoBack} onClick={() => history.push('/products')}>
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
              Prodcut Created (...redirecting to Products List)
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
        <p>ADD PRODUCT</p>
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
              rows='5'
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
            </select>

            <p>Category </p>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value='vegetables'>Vegetables</option>
              <option value='fruits'>Fruits</option>
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
              'Add Product Now'
            )}
          </button>
        </div>
      </div>
    </>
  );
};

export default CreateProduct;
