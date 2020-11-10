import Axios from 'axios';
import { CART_EMPTY } from '../constants/cartConstants';
import { ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS, ORDER_CREATE_FAIL, ORDER_DETAILS_SUCCESS, ORDER_DETAILS_FAIL, ORDER_DETAILS_REQUEST, ORDER_PAY_REQUEST, ORDER_PAY_SUCCESS, ORDER_PAY_FAIL, MY_ORDER_LIST_REQUEST, MY_ORDER_LIST_SUCCESS, MY_ORDER_LIST_FAIL, ORDER_LIST_REQUEST, ORDER_LIST_SUCCESS, ORDER_LIST_FAIL, ORDER_DELETE_REQUEST, ORDER_DELETE_SUCCESS, ORDER_DELETE_FAIL, ORDER_DELIVER_REQUEST, ORDER_DELIVER_SUCCESS, ORDER_DELIVER_FAIL } from '../constants/orderConstants';

const createOrder = (order) => async (dispatch, getState) => {
   try {
        dispatch({type: ORDER_CREATE_REQUEST, payload: order});
        const { userSignin: { userInfo }} = getState();
        //const { data: { data: newOrder }} = await Axios.post('/orders', order, {
        const {data} = await Axios.post('/orders', order, {
            headers: {
                Authorization: 'Bearer ' + userInfo.token
            }
        });
        dispatch({ type: ORDER_CREATE_SUCCESS, payload: data.order});
        dispatch({ type: CART_EMPTY})
        localStorage.removeItem('cartItems');
   } catch (error) {
       dispatch({ type: ORDER_CREATE_FAIL, payload: error.response && error.response.data.message ?
        error.response.data.message
         :
        error.message});
   }


   
}


const detailsOrder = (orderId) => async (dispatch, getState) => {
    try {
        dispatch({ type: ORDER_DETAILS_REQUEST, payload: orderId });
        const { userSignin: { userInfo }} = getState();
        const { data } = await Axios.get("/orders/" + orderId, {
            headers: 
            { Authorization: 'Bearer ' + userInfo.token }
        });
        dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data})
    } catch (error) {
        dispatch({ type: ORDER_DETAILS_FAIL, payload: error.response && error.response.data.message ?
          error.response.data.message
           :
          error.message});
    }
} 


const listMyOrders = () => async (dispatch, getState) => {
    try {
      dispatch({ type: MY_ORDER_LIST_REQUEST });
      const { userSignin: { userInfo } } = getState();
      const { data } = await Axios.get("/orders/myorders", {
        headers:
          { Authorization: 'Bearer ' + userInfo.token }
      });
      dispatch({ type: MY_ORDER_LIST_SUCCESS, payload: data })
    } catch (error) {
      dispatch({ type: MY_ORDER_LIST_FAIL, payload: error.response && error.response.data.message ?
        error.response.data.message
         :
        error.message });
    }
  }


  const listOrders = () => async (dispatch, getState) => {
    try {
      dispatch({ type: ORDER_LIST_REQUEST });
      const { userSignin: { userInfo } } = getState();
      const { data } = await Axios.get("/orders", {
        headers:
          { Authorization: 'Bearer ' + userInfo.token }
      });
      dispatch({ type: ORDER_LIST_SUCCESS, payload: data })
    } catch (error) {
      dispatch({ type: ORDER_LIST_FAIL, payload: error.response && error.response.data.message ?
        error.response.data.message
         :
        error.message });
    }
  }



const payOrder = (order, paymentResult) => async (dispatch, getState) => {
    try {
        dispatch({ type: ORDER_PAY_REQUEST, payload: {order, paymentResult} });
        const { userSignin: { userInfo }} = getState();
        const { data } = await Axios.put("/orders/" + order._id + '/pay', paymentResult, {
            headers: 
            { Authorization: 'Bearer ' + userInfo.token }
        });
        dispatch({ type: ORDER_PAY_SUCCESS, payload: data})
    } catch (error) {
        dispatch({ type: ORDER_PAY_FAIL, payload: error.response && error.response.data.message ?
          error.response.data.message
           :
          error.message});
    }
} 


const deleteOrder = (orderId) => async (dispatch, getState) => {
    try {
      dispatch({ type: ORDER_DELETE_REQUEST, payload: orderId });
      const { userSignin: { userInfo } } = getState();
      const { data } = await Axios.delete("/orders/" + orderId, {
        headers:
          { Authorization: 'Bearer ' + userInfo.token }
      });
      dispatch({ type: ORDER_DELETE_SUCCESS, payload: data })
    } catch (error) {
      dispatch({ type: ORDER_DELETE_FAIL, payload: error.response && error.response.data.message ?
        error.response.data.message
         :
        error.message });
    }
  }



  const deliverOrder = (orderId) => async (dispatch, getState) => {
    try {
        dispatch({ type: ORDER_DELIVER_REQUEST, payload: orderId });
        const { userSignin: { userInfo }} = getState();
        const { data } = await Axios.put("/orders/" + orderId + '/deliver', {}, {
            headers: 
            { Authorization: 'Bearer ' + userInfo.token }
        });
        dispatch({ type: ORDER_DELIVER_SUCCESS, payload: data})
    } catch (error) {
        dispatch({ type: ORDER_DELIVER_FAIL, payload: error.response && error.response.data.message ?
          error.response.data.message
           :
          error.message});
    }
} 


export { createOrder, detailsOrder, payOrder, listMyOrders, listOrders, deliverOrder, deleteOrder};