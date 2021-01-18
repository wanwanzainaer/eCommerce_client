import { combineReducers } from 'redux';
import { productListReducer } from './productListReducer';
import { productDetailsReducer } from './productDetailsReducer';
import { cartReducer } from './cartReducer';
import { userLoginReducer } from './userLoginReducer';
import { userRegisterReducer } from './userRegisterReducer';
import { userDetailsReducer } from './userDetailsReducer';
import { userUpdateProfileReducer } from './userUpdateProfileReducer';
import { orderCreateReducer } from './orderCreateReducer';
import { orderDetailReducer } from './orderDetailReducer';
import { orderPayReducer } from './orderPayReducer';
import { orderUserListReducer } from './orderUserListReducer';
import { userListReducer } from './userListReducer';
import { userDeleteReducer } from './userDeleteReducer';
import { userUpdateReducer } from './userUpdateReducer';
export const reducers = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailReducer,
  orderPay: orderPayReducer,
  orderUserList: orderUserListReducer,
});
