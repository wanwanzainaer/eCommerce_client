import { productActionType } from '../actions/productActionTypes';

const initialState = {};

export const productCreateReviewReducer = (
  state = initialState,
  action: any
) => {
  switch (action.type) {
    case productActionType.PRODUCT_CREATE_REVIEW_REQUEST:
      return { loading: true };
    case productActionType.PRODUCT_CREATE_REVIEW_SUCCESS:
      return { loading: false, success: true };
    case productActionType.PRODUCT_CREATE_REVIEW_FAIL:
      return { ...state, loading: false, error: action.payload };
    case productActionType.PRODUCT_CREATE_REVIEW_RESET:
      return {};
    default:
      return state;
  }
};
