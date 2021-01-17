import { orderActionType } from '../actions/orderActionType';

const initialState = {};

export const orderPayReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case orderActionType.ORDER_PAY_REQUEST:
      return { ...state, loading: true };
    case orderActionType.ORDER_PAY_SUCCESS:
      return { ...state, loading: false, success: true };
    case orderActionType.ORDER_PAY_FAIL:
      return { ...state, loading: false, error: action.payload };
    case orderActionType.ORDER_PAY_RESET:
      return {};
    default:
      return state;
  }
};
