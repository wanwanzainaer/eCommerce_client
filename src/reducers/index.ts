import { combineReducers } from 'redux';
import { productListReducer } from './productListReducer';
import { productDetailsReducer } from './productDetailsReducer';
export const reducers = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
});
