import { userActionType } from '../actions/userActionType';

const initialState = { user: {} };

export const userUpdateReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case userActionType.USER_UPDATE_REQUEST:
      return { loading: true };
    case userActionType.USER_UPDATE_SUCCESS:
      return { loading: false, success: true };
    case userActionType.USER_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case userActionType.USER_UPDATE_RESET:
      return {};
    default:
      return state;
  }
};
