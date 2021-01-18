import axios from 'axios';
import { Dispatch } from 'redux';

import { userActionType } from './userActionType';
import { orderActionType } from './orderActionType';

export const login = (email: string, password: string) => async (
  dispatch: Dispatch
) => {
  try {
    dispatch({
      type: userActionType.USER_LOGIN_REQUEST,
    });
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const { data } = await axios.post(
      '/api/users/login',
      { email, password },
      config
    );
    dispatch({
      type: userActionType.USER_LOGIN_SUCCESS,
      payload: data,
    });

    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (err) {
    dispatch({
      type: userActionType.USER_LOGIN_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const logout = () => (dispatch: Dispatch) => {
  localStorage.removeItem('userInfo');
  dispatch({ type: userActionType.USER_LIST_RESET });
  dispatch({ type: userActionType.USER_DETAILS_RESET });
  dispatch({ type: orderActionType.ORDER_LIST_USER_RESET });
  dispatch({ type: userActionType.USER_LOGOUT });
};
export const register = (
  name: string,
  email: string,
  password: string
) => async (dispatch: Dispatch) => {
  try {
    dispatch({
      type: userActionType.USER_REGISTER_REQUEST,
    });
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const { data } = await axios.post(
      '/api/users/signup',
      { name, email, password },
      config
    );
    dispatch({
      type: userActionType.USER_REGISTER_SUCCESS,
      payload: data,
    });
    dispatch({
      type: userActionType.USER_LOGIN_SUCCESS,
      payload: data,
    });

    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (err) {
    dispatch({
      type: userActionType.USER_REGISTER_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const getUserDetails = (id: string) => async (
  dispatch: Dispatch,
  getState: () => { userLogin: { userInfo: { token: string } } }
) => {
  try {
    dispatch({
      type: userActionType.USER_DETAILS_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get(`/api/users/${id}`, config);
    dispatch({
      type: userActionType.USER_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: userActionType.USER_DETAILS_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const updateUserProfile = (user: any) => async (
  dispatch: Dispatch,
  getState: () => { userLogin: { userInfo: { token: string } } }
) => {
  try {
    dispatch({
      type: userActionType.USER_UPDATE_PROFILE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.patch(`/api/users/profile/`, user, config);
    dispatch({
      type: userActionType.USER_UPDATE_PROFILE_SUCCESS,
      payload: data,
    });
    dispatch({
      type: userActionType.USER_LOGIN_SUCCESS,
      payload: data,
    });

    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (err) {
    dispatch({
      type: userActionType.USER_UPDATE_PROFILE_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const getListUsers = () => async (
  dispatch: Dispatch,
  getState: () => { userLogin: { userInfo: { token: string } } }
) => {
  try {
    dispatch({
      type: userActionType.USER_LIST_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get(`/api/users/`, config);
    dispatch({
      type: userActionType.USER_LIST_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: userActionType.USER_LIST_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const deleteUser = (id: string) => async (
  dispatch: Dispatch,
  getState: () => { userLogin: { userInfo: { token: string } } }
) => {
  try {
    dispatch({
      type: userActionType.USER_DELETE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    await axios.delete(`/api/users/${id}`, config);
    dispatch({
      type: userActionType.USER_DELETE_SUCCESS,
    });
  } catch (err) {
    dispatch({
      type: userActionType.USER_DELETE_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};
