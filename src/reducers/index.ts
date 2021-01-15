import { combineReducers } from 'redux';
import { productListReducer } from './productListReducer';
import { productDetailsReducer } from './productDetailsReducer';
import { cartReducer } from './cartReducer';
import { userLoginReducer } from './userLoginReducer';
import { userRegisterReducer } from './userRegisterReducer';
import { userDetailsReducer } from './userDetailsReducer';
import { userUpdateProfileReducer } from './userUpdateProfileReducer';

export const reducers = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
});
