import axios from 'axios';
import { productActionType } from './productActionTypes';
import { Dispatch } from 'redux';

export const getListProducts = () => async (dispatch: Dispatch) => {
  try {
    dispatch({ type: productActionType.PRODUCT_LIST_REQUEST });
    const { data } = await axios.get('/api/products');
    dispatch({
      type: productActionType.PRODUCT_LIST_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: productActionType.PRODUCT_LIST_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const getProductDetails = (id: string) => async (dispatch: Dispatch) => {
  try {
    dispatch({ type: productActionType.PRODUCT_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/products/${id}`);
    dispatch({
      type: productActionType.PRODUCT_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: productActionType.PRODUCT_DETAILS_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const deleteProduct = (id: string) => async (
  dispatch: Dispatch,
  getState: () => { userLogin: { userInfo: { token: string } } }
) => {
  try {
    dispatch({
      type: productActionType.PRODUCT_DELETE_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    await axios.delete(`/api/products/${id}`, config);
    dispatch({
      type: productActionType.PRODUCT_DELETE_SUCCESS,
    });
  } catch (err) {
    dispatch({
      type: productActionType.PRODUCT_DELETE_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const createProduct = () => async (
  dispatch: Dispatch,
  getState: () => { userLogin: { userInfo: { token: string } } }
) => {
  try {
    dispatch({
      type: productActionType.PRODUCT_CREATE_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.post(`/api/products`, {}, config);
    dispatch({
      type: productActionType.PRODUCT_CREATE_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: productActionType.PRODUCT_CREATE_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const updateProduct = (productData: any) => async (
  dispatch: Dispatch,
  getState: () => { userLogin: { userInfo: { token: string } } }
) => {
  try {
    dispatch({
      type: productActionType.PRODUCT_UPDATE_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.patch(
      `/api/products/${productData._id}`,
      productData,
      config
    );
    dispatch({
      type: productActionType.PRODUCT_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: productActionType.PRODUCT_UPDATE_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};
