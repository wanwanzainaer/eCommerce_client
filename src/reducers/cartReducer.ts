import { cartActionType } from '../actions/cartActionType';

export interface ICartItem {
  product: string;
  name: string;
  image: string;
  price: number;
  countInStock: number;
  qty: number;
}
interface cartAction {
  type: cartActionType;
  payload: ICartItem | IShippingAddress | string;
}
export interface IShippingAddress {
  address: string;
  postalCode: string;
  country: string;
  city: string;
}
export interface ICartInitialState {
  cartItems: ICartItem[];
  shippingAddress: IShippingAddress;
}
const initialState: ICartInitialState = {
  cartItems: [],
  shippingAddress: { address: '', postalCode: '', country: '', city: '' },
};

export const cartReducer = (state = initialState, action: cartAction) => {
  switch (action.type) {
    case cartActionType.CART_ADD_ITEM:
      const item = action.payload as ICartItem;
      const existItem = state.cartItems.find(
        (x: ICartItem) => x.product === item.product
      );
      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.product === existItem.product ? item : x
          ),
        };
      } else {
        return { ...state, cartItems: [...state.cartItems, item] };
      }
    case cartActionType.CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter((x) => x.product !== action.payload),
      };
    case cartActionType.CART_SAVE_SHIPPING_ADDRESS:
      return {
        ...state,
        shippingAddress: action.payload,
      };
    default:
      return state;
  }
};
