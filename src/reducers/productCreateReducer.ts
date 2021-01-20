import { productActionType } from '../actions/productActionTypes';

const initialState = {};

export const productCreateReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case productActionType.PRODUCT_CREATE_REQUEST:
      return { loading: true };
    case productActionType.PRODUCT_CREATE_SUCCESS:
      return { loading: false, success: true, product: action.payload };
    case productActionType.PRODUCT_CREATE_FAIL:
      return { ...state, loading: false, error: action.payload };
    case productActionType.PRODUCT_CREATE_RESET:
      return {};
    default:
      return state;
  }
};
