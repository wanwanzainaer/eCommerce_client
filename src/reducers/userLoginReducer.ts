import { userActionType } from '../actions/userActionType';

const initialState = {};

export const userLoginReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case userActionType.USER_LOGIN_REQUEST:
      return { ...state, loading: true };
    case userActionType.USER_LOGIN_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case userActionType.USER_LOGIN_FAIL:
      return { ...state, loading: false, error: action.payload };
    case userActionType.USER_LOGIN_LOGOUT:
      return {};
    default:
      return state;
  }
};
