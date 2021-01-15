import axios from 'axios';
import { Dispatch } from 'redux';
import { IProduct } from '../components/Product';
import { IShippingAddress } from '../reducers/cartReducer';
import { cartActionType } from './cartActionType';

export const addToCart = (id: string, qty: number) => async (
  dispatch: Dispatch,
  getState: () => { cart: { cartItems: {} } }
) => {
  const { data }: { data: IProduct } = await axios.get(`/api/products/${id}`);

  dispatch({
    type: cartActionType.CART_ADD_ITEM,
    payload: {
      product: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      qty,
    },
  });

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

export const removeFromCart = (id: string) => async (
  dispatch: Dispatch,
  getState: () => { cart: { cartItems: {} } }
) => {
  dispatch({ type: cartActionType.CART_REMOVE_ITEM, payload: id });
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

export const saveShippingAddress = (formData: IShippingAddress) => async (
  dispatch: Dispatch
) => {
  dispatch({
    type: cartActionType.CART_SAVE_SHIPPING_ADDRESS,
    payload: formData,
  });

  localStorage.setItem('shippingAddress', JSON.stringify(formData));
};

export const savePaymentMethod = (paymentMethod: string) => async (
  dispatch: Dispatch
) => {
  dispatch({
    type: cartActionType.CART_SAVE_PAYMENT_METHOD,
    payload: paymentMethod,
  });

  localStorage.setItem('paymentMethod', JSON.stringify(paymentMethod));
};
