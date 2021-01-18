import { userActionType } from '../actions/userActionType';

const initialState = { users: [] };

export const userListReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case userActionType.USER_LIST_REQUEST:
      return { ...state, loading: true };
    case userActionType.USER_LIST_SUCCESS:
      return { loading: false, users: action.payload };
    case userActionType.USER_LIST_FAIL:
      return { ...state, loading: false, error: action.payload };
    case userActionType.USER_LIST_RESET:
      return { users: [] };
    default:
      return state;
  }
};
