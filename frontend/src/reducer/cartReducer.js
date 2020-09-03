import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "../constants/cartConstants";

function cartReducer( state = {cartItems: []}, action) {
    switch(action.type) {
        case CART_ADD_ITEM:
            // meaning: used to update the state in our cartAction.js
            const item = action.payload;
            // find the cart item in array and return if matches with 
            const product = state.cartItems.find(x => x.name === item.name);
            //if a match. 
            if(product) {

                return {
                    //spread cart items(item has new value for quantity ? overrwrite. Else return same value)
                     cartItems: state.cartItems.map(x => x.name === product.name ? item : x) // 
                }
            }
            return { cartItems: [...state.cartItems, item]}
            case CART_REMOVE_ITEM:
                return { cartItems: state.cartItems.filter(x => x.id !== action.payload)}
            default: 
                return state
    }
}


export {cartReducer}