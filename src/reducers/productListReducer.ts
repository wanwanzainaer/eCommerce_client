import { productActionType } from '../actions/productActionTypes';

const initialState = { products: [] };

export const productListReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case productActionType.PRODUCT_LIST_REQUEST:
      return { ...state, loading: true };
    case productActionType.PRODUCT_LIST_SUCCESS:
      return {
        loading: false,
        pages: action.payload.pages,
        page: action.payload.page,
        products: action.payload.products,
      };
    case productActionType.PRODUCT_LIST_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
