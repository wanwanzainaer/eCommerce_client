import { orderActionType } from '../actions/orderActionType';

const initialState = {};

export const orderDeliverReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case orderActionType.ORDER_DELIVER_REQUEST:
      return { ...state, loading: true };
    case orderActionType.ORDER_DELIVER_SUCCESS:
      return { ...state, loading: false, success: true };
    case orderActionType.ORDER_DELIVER_FAIL:
      return { ...state, loading: false, error: action.payload };
    case orderActionType.ORDER_DELIVER_RESET:
      return {};
    default:
      return state;
  }
};
