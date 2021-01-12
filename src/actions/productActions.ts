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
