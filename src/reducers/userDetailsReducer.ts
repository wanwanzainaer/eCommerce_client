import { userActionType } from '../actions/userActionType';

const initialState = { user: {} };

export const userDetailsReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case userActionType.USER_DETAILS_REQUEST:
      return { ...state, loading: true };
    case userActionType.USER_DETAILS_SUCCESS:
      return { loading: false, user: action.payload };
    case userActionType.USER_DETAILS_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
