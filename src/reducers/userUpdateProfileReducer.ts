import { userActionType } from '../actions/userActionType';

const initialState = {};

export const userUpdateProfileReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case userActionType.USER_UPDATE_PROFILE_REQUEST:
      return { ...state, loading: true };
    case userActionType.USER_UPDATE_PROFILE_SUCCESS:
      return { loading: false, success: true, userInfo: action.payload };
    case userActionType.USER_UPDATE_PROFILE_FAIL:
      return { ...state, loading: false, error: action.payload };
    case userActionType.USER_UPDATE_PROFILE_RESET:
      return {};
    default:
      return state;
  }
};
