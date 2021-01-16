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

    localStorage.setItem('userInfo', JSON.stringify(data));
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

    localStorage.setItem('userInfo', JSON.stringify(data));
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
