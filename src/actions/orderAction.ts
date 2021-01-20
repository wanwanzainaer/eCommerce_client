import axios from 'axios';
import { orderActionType } from '../actions/orderActionType';
import { Dispatch } from 'redux';
export const createOrder = (order: any) => async (
  dispatch: Dispatch,
  getState: () => { userLogin: { userInfo: { token: string } } }
) => {
  try {
    dispatch({
      type: orderActionType.ORDER_CREATE_REQUEST,
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
    const { data } = await axios.post(`/api/orders/`, order, config);
    dispatch({
      type: orderActionType.ORDER_CREATE_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: orderActionType.ORDER_CREATE_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const payOrder = (orderId: string, paymentResult: any) => async (
  dispatch: Dispatch,
  getState: () => { userLogin: { userInfo: { token: string } } }
) => {
  try {
    dispatch({
      type: orderActionType.ORDER_PAY_REQUEST,
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
    const { data } = await axios.put(
      `/api/orders/${orderId}/pay`,
      paymentResult,
      config
    );
    dispatch({
      type: orderActionType.ORDER_PAY_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: orderActionType.ORDER_PAY_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const deliverOrder = (orderId: string) => async (
  dispatch: Dispatch,
  getState: () => { userLogin: { userInfo: { token: string } } }
) => {
  try {
    dispatch({
      type: orderActionType.ORDER_DELIVER_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    await axios.put(`/api/orders/${orderId}/deliver`, {}, config);
    dispatch({
      type: orderActionType.ORDER_DELIVER_SUCCESS,
    });
  } catch (err) {
    dispatch({
      type: orderActionType.ORDER_DELIVER_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const getOrderDetails = (id: string) => async (
  dispatch: Dispatch,
  getState: () => { userLogin: { userInfo: { token: string } } }
) => {
  try {
    dispatch({
      type: orderActionType.ORDER_DETAILS_REQUEST,
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
    const { data } = await axios.get(`/api/orders/${id}`, config);
    dispatch({
      type: orderActionType.ORDER_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: orderActionType.ORDER_DETAILS_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const listUserOrder = () => async (
  dispatch: Dispatch,
  getState: () => { userLogin: { userInfo: { token: string } } }
) => {
  try {
    dispatch({
      type: orderActionType.ORDER_LIST_USER_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get(`/api/orders/userorder`, config);
    dispatch({
      type: orderActionType.ORDER_LIST_USER_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: orderActionType.ORDER_LIST_USER_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const listOrders = () => async (
  dispatch: Dispatch,
  getState: () => { userLogin: { userInfo: { token: string } } }
) => {
  try {
    dispatch({
      type: orderActionType.ORDER_LIST_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get(`/api/orders`, config);
    dispatch({
      type: orderActionType.ORDER_LIST_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: orderActionType.ORDER_LIST_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};
