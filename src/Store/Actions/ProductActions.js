import axios from 'axios';
import {
  CREATE_PRODUCT_FAIL,
  CREATE_PRODUCT_REQUEST,
  CREATE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAIL,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  GET_PRODUCTSLIST_ERROR,
  GET_PRODUCTSLIST_REQUEST,
  GET_PRODUCTSLIST_SUCCESS,
  GET_PRODUCT_ERROR,
  GET_PRODUCT_REQUEST,
  GET_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_FAIL,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_SUCCESS,
} from './ActionTypes';

//get all products
export const getProducts = () => async (dispatch) => {
  try {
    dispatch({
      type: GET_PRODUCTSLIST_REQUEST,
    });
    const { data } = await axios.get('/api/products');

    dispatch({
      type: GET_PRODUCTSLIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_PRODUCTSLIST_ERROR,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getProductById = (id) => async (dispatch) => {
  try {
    dispatch({
      type: GET_PRODUCT_REQUEST,
    });
    const { data } = await axios.get(`/api/products/${id}`);

    dispatch({
      type: GET_PRODUCT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_PRODUCT_ERROR,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//Update product
export const updateProductAction = (id, { name,description,price,countInStock,brand,category,imageInput, }) => async (dispatch,getState) => {
  try {
       
    dispatch({
      type: UPDATE_PRODUCT_REQUEST,
    });
    if (!name || !description || !price || !countInStock) {
      throw new Error('Fill all the required feilds');
    }
    let updatedImage, updatedImageId;
     if (imageInput) {
        const {
      data: { image, imageId },
    } = await axios.post(`/api/products/image/update/${id}`, imageInput , {
      headers: { 'Content-type': 'application/form-data' },
    });
    // console.log(image, imageId)
    updatedImage = image;
    updatedImageId= imageId;
    }
   
    // dispatch({
    //   type: UPDATE_PRODUCT_REQUEST,
    // });

    const {
      user: { admin },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${admin.adminInfo.token}`,
      },
    };
    //  console.log(
    //     updatedImage,
    //     updatedImageId, )

    await axios.post(`/api/products/${id}`, {   
        name,
        description,
        price,
        countInStock,
        brand,
        category, 
        updatedImage,
        updatedImageId
        }, config);
    dispatch({
      type: UPDATE_PRODUCT_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_PRODUCT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//Delete product
export const deleteProductAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: DELETE_PRODUCT_REQUEST,
    });

    const {
      user: { admin },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${admin.adminInfo.token}`,
      },
    };

    await axios.get(`/api/products/delete/${id}`, config);

    dispatch({
      type: DELETE_PRODUCT_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: DELETE_PRODUCT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//Delete product
export const createProductAction = ({
  name,
  description,
  price,
  countInStock,
  brand,
  category,
  imageInput,
}) => async (dispatch, getState) => {
  try {
    if (!name || !description || !price || !countInStock) {
      // console.log(name, description, price, countInStock);
      throw new Error('Fill all the required feilds');
    }

    dispatch({
      type: CREATE_PRODUCT_REQUEST,
    });

    if (!imageInput) {
      throw new Error('Upload an Image');
    }

    //uplaoding image and getting image and imageId
    const {
      data: { image, imageId },
    } = await axios.post('/api/products/image/upload', imageInput, {
      headers: { 'Content-type': 'application/form-data' },
    });
    // console.log(data);

    const {
      user: { admin },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${admin.adminInfo.token}`,
      },
    };

    await axios.post(
      `/api/products/`,
      {
        name,
        description,
        price,
        countInStock,
        brand,
        category,
        image,
        imageId,
      },
      config
    );

    dispatch({
      type: CREATE_PRODUCT_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: CREATE_PRODUCT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
