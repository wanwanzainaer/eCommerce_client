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
  payload: ICartItem | string;
}
const initialState: { cartItems: ICartItem[] } = { cartItems: [] };

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
    default:
      return state;
  }
};
