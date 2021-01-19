import { productActionType } from '../actions/productActionTypes';

const initialState = {};

export const productDeleteReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case productActionType.PRODUCT_DELETE_REQUEST:
      return { loading: true };
    case productActionType.PRODUCT_DELETE_SUCCESS:
      return { loading: false, success: true };
    case productActionType.PRODUCT_DELETE_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
