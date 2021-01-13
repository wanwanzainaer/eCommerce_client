import { userActionType } from '../actions/userActionType';

const initialState = {};

export const userRegisterReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case userActionType.USER_REGISTER_REQUEST:
      return { ...state, loading: true };
    case userActionType.USER_REGISTER_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case userActionType.USER_REGISTER_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
