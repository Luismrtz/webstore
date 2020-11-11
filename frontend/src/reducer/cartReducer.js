import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_SAVE_SHIPPING, CART_SAVE_PAYMENT, CART_EMPTY } from "../constants/cartConstants";

function cartReducer(
  state = { cartItems: [], shipping: {}, payment: {} },action) {
  switch (action.type) {
    case CART_ADD_ITEM:
      // meaning: used to update the state in our cartAction.js
      const item = action.payload;
      // find the cart item in array and return if matches with
      const product = state.cartItems.find((x) => x.name === item.name);
      //if a match.
      if (product) {
        return {
            ...state,
          //spread cart items(item has new value for quantity ? overrwrite. Else return same value)
          cartItems: state.cartItems.map((x) =>
            x.name === product.name ? item : x
          ), //
        };
      }
      return { ...state, cartItems: [...state.cartItems, item] };
    case CART_REMOVE_ITEM:
      return {
          ...state,
        cartItems: state.cartItems.filter((x) => x.id !== action.payload),
      };
    case CART_SAVE_SHIPPING:
      return { ...state, shipping: action.payload };
    case CART_SAVE_PAYMENT:
      return { ...state, payment: action.payload };
    case CART_EMPTY:
      return {...state, cartItems: []}

    default:
      return state;
  }
}


export {cartReducer}