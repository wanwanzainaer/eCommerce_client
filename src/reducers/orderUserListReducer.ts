import { orderActionType } from '../actions/orderActionType';

const initialState = { orders: [] };

export const orderUserListReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case orderActionType.ORDER_LIST_USER_REQUEST:
      return { ...state, loading: true };
    case orderActionType.ORDER_LIST_USER_SUCCESS:
      return { ...state, loading: false, orders: action.payload };
    case orderActionType.ORDER_LIST_USER_FAIL:
      return { ...state, loading: false, error: action.payload };
    case orderActionType.ORDER_LIST_USER_RESET:
      return { orders: [] };
    default:
      return state;
  }
};
