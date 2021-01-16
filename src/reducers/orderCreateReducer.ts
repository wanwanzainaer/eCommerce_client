import { orderActionType } from '../actions/orderActionType';

const initialState = {};

export const orderCreateReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case orderActionType.ORDER_CREATE_REQUEST:
      return { ...state, loading: true };
    case orderActionType.ORDER_CREATE_SUCCESS:
      return { ...state, loading: false, success: true, order: action.payload };
    case orderActionType.ORDER_CREATE_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
