import { productActionType } from '../actions/productActionTypes';

const initialState = { product: { reviews: [] } };

export const productDetailsReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case productActionType.PRODUCT_DETAILS_REQUEST:
      return { ...state, loading: true };
    case productActionType.PRODUCT_DETAILS_SUCCESS:
      return { loading: false, product: action.payload };
    case productActionType.PRODUCT_DETAILS_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
