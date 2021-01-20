import { orderActionType } from '../actions/orderActionType';

const initialState = { orders: [] };

export const orderListReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case orderActionType.ORDER_LIST_REQUEST:
      return { ...state, loading: true };
    case orderActionType.ORDER_LIST_SUCCESS:
      return { ...state, loading: false, orders: action.payload };
    case orderActionType.ORDER_LIST_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
