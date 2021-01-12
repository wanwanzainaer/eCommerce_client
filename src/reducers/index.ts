import { combineReducers } from 'redux';
import { productListReducer } from './productListReducer';
import { productDetailsReducer } from './productDetailsReducer';
import { cartReducer } from './cartReducer';
export const reducers = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
});
