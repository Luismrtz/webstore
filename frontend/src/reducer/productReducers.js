import { 
    PRODUCT_LIST_REQUEST, 
    PRODUCT_LIST_SUCCESS, 
    PRODUCT_LIST_FAIL, 
    PRODUCT_DETAILS_REQUEST, 
    PRODUCT_DETAILS_SUCCESS, 
    PRODUCT_DETAILS_FAIL } from "../constants/productConstants";

function productListReducer(state= {products: []}, action) {

    switch (action.type) {
        case PRODUCT_LIST_REQUEST: //send request to server to get list of products
            return { loading: true, products: []}; // for loading box during this case
        case PRODUCT_LIST_SUCCESS: // received data from server
            return { loading: false, products: action.payload}; // 
        case PRODUCT_LIST_FAIL: // in case of an error
            return { loading: false, error: action.payload}
        default: 
            return state; // do not change state at all
        }
}


function productDetailsReducer(state= {products: {}}, action) {

    switch (action.type) {
        case PRODUCT_DETAILS_REQUEST: //send request to server to get list of products
            return { loading: true }; // for loading box during this case
        case PRODUCT_DETAILS_SUCCESS: // received data from server
            return { loading: false, product: action.payload}; // 
        case PRODUCT_DETAILS_FAIL: // in case of an error
            return { loading: false, error: action.payload}
        default: 
            return state; // do not change state at all
        }
}

// function productBannerReducer(state = )

export {productListReducer, productDetailsReducer}