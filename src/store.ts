import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { reducers } from './reducers/index';

// localStorage.removeItem('cartItems');
const cartItemsFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems')!)
  : [];

// const initialState = {};
const initialState = { cart: { cartItems: cartItemsFromStorage } };

const middleware = [thunk];

const store = createStore(
  reducers,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export { store };
