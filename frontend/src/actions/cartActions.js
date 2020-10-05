import axios from 'axios';
import Cookie from 'js-cookie';
import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_SAVE_SHIPPING, CART_SAVE_PAYMENT } from '../constants/cartConstants';

const addToCart = (productId, qty) => async (dispatch, getState) => { // function returns another function of dispatch
    try {
        const { data } = await axios.get("/storeProducts/" + productId);
        dispatch({type: CART_ADD_ITEM, payload: {
            id: data._id,
            name: data.title,
            image: data.img,
            price: data.price,
            stock: data.stock,
            sale: data.sale,
            discount: data.discount,
            qty
        }});

        const {cart: {cartItems}} = getState();
        Cookie.set("cartItems", JSON.stringify(cartItems));

    } catch (error) {
       console.log("helloo")
    }
}
const removeFromCart = (productId) => (dispatch, getState) => {
    dispatch({type: CART_REMOVE_ITEM, payload: productId});

    const {cart: {cartItems}} = getState();
    Cookie.set("cartItems", JSON.stringify(cartItems));
}

const saveShipping = (data) => (dispatch) => {
    dispatch({ type: CART_SAVE_SHIPPING, payload: data});
}

const savePayment = (data) => (dispatch) => {
    dispatch({ type: CART_SAVE_PAYMENT, payload: data});
}
export {addToCart, removeFromCart, saveShipping, savePayment};