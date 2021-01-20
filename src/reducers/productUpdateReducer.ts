import { productActionType } from '../actions/productActionTypes';

const initialState = { product: {} };

export const productUpdateReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case productActionType.PRODUCT_UPDATE_REQUEST:
      return { loading: true };
    case productActionType.PRODUCT_UPDATE_SUCCESS:
      return { loading: false, success: true, product: action.payload };
    case productActionType.PRODUCT_UPDATE_FAIL:
      return { ...state, loading: false, error: action.payload };
    case productActionType.PRODUCT_UPDATE_RESET:
      return { product: {} };
    default:
      return state;
  }
};
