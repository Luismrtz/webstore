import axios from 'axios';
import Cookie from 'js-cookie';
import { CART_ADD_ITEM, CART_REMOVE_ITEM } from '../constants/cartConstants';

const addToCart = (productId, qty) => async (dispatch, getState) => { // function returns another function of dispatch
    try {
        const { data } = await axios.get("/storeProducts/" + productId);
        dispatch({type: CART_ADD_ITEM, payload: {
            id: data._id,
            name: data.title,
            image: data.img,
            price: data.price,
            stock: data.stock,
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

export {addToCart, removeFromCart};