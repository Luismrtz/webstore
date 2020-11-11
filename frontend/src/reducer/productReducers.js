import { 
    PRODUCT_LIST_REQUEST, 
    PRODUCT_LIST_SUCCESS, 
    PRODUCT_LIST_FAIL, 
    PRODUCT_DETAILS_REQUEST, 
    PRODUCT_DETAILS_SUCCESS, 
    PRODUCT_DETAILS_FAIL,
    PRODUCT_SAVE_REQUEST,
    PRODUCT_SAVE_SUCCESS,
    PRODUCT_SAVE_FAIL,
    PRODUCT_DELETE_REQUEST,
    PRODUCT_DELETE_SUCCESS,
    PRODUCT_DELETE_FAIL, PRODUCT_REVIEW_SAVE_REQUEST, PRODUCT_REVIEW_SAVE_SUCCESS, PRODUCT_REVIEW_SAVE_FAIL, PRODUCT_REVIEW_SAVE_RESET
     } from "../constants/productConstants";

function productListReducer(state= { loading: true, products: []}, action) {

    switch (action.type) {
        case PRODUCT_LIST_REQUEST: //send request to server to get list of products
            return { loading: true, products: []}; // for loading box during this case
        case PRODUCT_LIST_SUCCESS: // received data from server
            return { ...state, loading: false, products: action.payload}; // 
        case PRODUCT_LIST_FAIL: // in case of an error
            return { loading: false, error: action.payload}
        default: 
            return state; // do not change state at all
        }
}


function productDetailsReducer(state= {loading: true, products: {reviews: [] }}, action) {

    switch (action.type) {
        case PRODUCT_DETAILS_REQUEST: //send request to server to get list of products
            return { loading: true}; // for loading box during this case
        case PRODUCT_DETAILS_SUCCESS: // received data from server
            return { loading: false, product: action.payload}; // 
        case PRODUCT_DETAILS_FAIL: // in case of an error
            return { loading: false, error: action.payload}
        default: 
            return state; // do not change state at all
        }
}

function productDeleteReducer(state= {}, action) {

    switch (action.type) {
        case PRODUCT_DELETE_REQUEST: //send request to server to get list of products
            return { loading: true}; // for loading box during this case
        case PRODUCT_DELETE_SUCCESS: // received data from server
            return {...state, loading: false, product: action.payload, success: true}; // 
        case PRODUCT_DELETE_FAIL: // in case of an error
            return { loading: false, error: action.payload}
        default: 
            return state; // do not change state at all
        }
}

function productSaveReducer(state= {}, action) {

    switch (action.type) {
        case PRODUCT_SAVE_REQUEST: //send request to server to get list of products
            return { loading: true}; // for loading box during this case
        case PRODUCT_SAVE_SUCCESS: // received data from server
            return {...state, loading: false, success: true, product: action.payload}; // 
        case PRODUCT_SAVE_FAIL: // in case of an error
            return { loading: false, error: action.payload}
        default: 
            return state; // do not change state at all
        }
}

function productReviewSaveReducer(state = {}, action) {
    switch (action.type) {
      case PRODUCT_REVIEW_SAVE_REQUEST:
        return { loading: true };
      case PRODUCT_REVIEW_SAVE_SUCCESS:
        return { loading: false, review: action.payload, success: true };
      case PRODUCT_REVIEW_SAVE_FAIL:
        return { loading: false, errror: action.payload };
      case PRODUCT_REVIEW_SAVE_RESET:
        return {};
      default:
        return state;
    }
  }

// function productBannerReducer(state = )

export {productListReducer, productDetailsReducer, productSaveReducer, productDeleteReducer, productReviewSaveReducer}