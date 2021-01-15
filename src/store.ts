import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { reducers } from './reducers/index';
import {
  ICartItem,
  IShippingAddress,
  ICartInitialState,
} from './reducers/cartReducer';

// localStorage.removeItem('cartItems');
const cartItemsFromStorage: ICartItem[] = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems')!)
  : [];
const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo')!)
  : null;
const shippingAddressFromStorage: IShippingAddress = localStorage.getItem(
  'shippingAddress'
)
  ? JSON.parse(localStorage.getItem('shippingAddress')!)
  : { email: '', address: '', country: '', city: '' };
// const initialState = {};

interface InitalState {
  cart: any;
  // cart: ICartInitialState;
  userLogin: { userInfo: any };
}

const initialState: InitalState = {
  cart: {
    cartItems: cartItemsFromStorage,
    shippingAddress: shippingAddressFromStorage,
  },
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducers,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export { store };
