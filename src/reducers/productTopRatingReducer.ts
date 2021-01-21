import { productActionType } from '../actions/productActionTypes';

const initialState = { products: [] };

export const productTopRatingReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case productActionType.PRODUCT_PRODUCT_TOP_REQUEST:
      return { ...state, loading: true };
    case productActionType.PRODUCT_PRODUCT_TOP_SUCCESS:
      return { loading: false, products: action.payload };
    case productActionType.PRODUCT_PRODUCT_TOP_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
