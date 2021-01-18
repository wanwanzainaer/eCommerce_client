import { userActionType } from '../actions/userActionType';

const initialState = {};

export const userDeleteReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case userActionType.USER_DELETE_REQUEST:
      return { loading: true };
    case userActionType.USER_DELETE_SUCCESS:
      return { loading: false, success: true };
    case userActionType.USER_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
