import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import Cookie from 'js-cookie';
import { productListReducer, productDetailsReducer, productSaveReducer, productDeleteReducer, productReviewSaveReducer } from '../reducer/productReducers';
import {bannerListReducer} from '../reducer/bannerReducer';
import { cartReducer } from '../reducer/cartReducer';
import { userSigninReducer, userRegisterReducer, userUpdateReducer } from '../reducer/userReducer';
import { orderDetailsReducer, orderCreateReducer, orderPayReducer, myOrderListReducer, orderListReducer, orderDeleteReducer } from '../reducer/orderReducer';

const cartItems = Cookie.getJSON('cartItems') || [];
const userInfo = Cookie.getJSON('userInfo') || null;
const initialState = { cart: { cartItems, shipping: {}, payment: {} }, userSignin: {userInfo} };
const reducer = combineReducers({
    pList: productListReducer,
    pDetails: productDetailsReducer,
    bList: bannerListReducer,
    cart: cartReducer,
    userSignin: userSigninReducer,
    userRegister: userRegisterReducer,
    productSave: productSaveReducer,
    productDelete: productDeleteReducer,
    productReviewSave: productReviewSaveReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    userUpdate: userUpdateReducer,
    myOrderList: myOrderListReducer,
    orderList: orderListReducer,
    orderDelete: orderDeleteReducer
})
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
//thunk: to run async operations inside action in redux
const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)));
export default store