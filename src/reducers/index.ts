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
import { productCreateReducer } from './productCreateReducer';
import { productUpdateReducer } from './productUpdateReducer';
import { productDeleteReducer } from './productDeleteReducer';
import { orderListReducer } from './orderListReducer';
import { orderDeliverReducer } from './orderDeliverReducer';
import { productCreateReviewReducer } from './productCreateReviewReducer';
export const reducers = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  productDelete: productDeleteReducer,
  productCreate: productCreateReducer,
  productUpdate: productUpdateReducer,
  productCreateReview: productCreateReviewReducer,
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
  orderList: orderListReducer,
  orderDeliver: orderDeliverReducer,
});
