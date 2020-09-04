import { 
    BANNER_LIST_REQUEST, 
    BANNER_LIST_SUCCESS, 
    BANNER_LIST_FAIL  } from "../constants/bannerConstants";


function bannerListReducer(state= {banners: []}, action) {

    switch (action.type) {
        case BANNER_LIST_REQUEST: //send request to server to get list of products
            return { loading: true, banners: []}; // for loading box during this case
        case BANNER_LIST_SUCCESS: // received data from server
            return { loading: false, banners: action.payload}; // 
        case BANNER_LIST_FAIL: // in case of an error
            return { loading: false, error: action.payload}
        default: 
            return state; // do not change state at all
        }
}

export {bannerListReducer}
