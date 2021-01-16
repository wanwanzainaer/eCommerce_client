import { orderActionType } from '../actions/orderActionType';

const initialState = { loading: true, orderItems: [], shippingAddres: {} };

export const orderDetailReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case orderActionType.ORDER_DETAILS_REQUEST:
      return { ...state, loading: true };
    case orderActionType.ORDER_DETAILS_SUCCESS:
      return { ...state, loading: false };
    case orderActionType.ORDER_DETAILS_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
