import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import Cookie from 'js-cookie';
import { productListReducer, productDetailsReducer } from '../reducer/productReducers';
import {bannerListReducer} from '../reducer/bannerReducer';
import { cartReducer } from '../reducer/cartReducer';

const cartItems = Cookie.getJSON('cartItems') || [];

const initialState = { cart: { cartItems }};
const reducer = combineReducers({
    pList: productListReducer,
    pDetails: productDetailsReducer,
    bList: bannerListReducer,
    cart: cartReducer
})
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
//thunk: to run async operations inside action in redux
const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)));
export default store