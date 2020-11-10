import Axios from "axios";
import { 
    PRODUCT_LIST_REQUEST, 
    PRODUCT_LIST_SUCCESS, 
    PRODUCT_LIST_FAIL, 
    PRODUCT_SAVE_REQUEST,
    PRODUCT_SAVE_SUCCESS,
    PRODUCT_SAVE_FAIL,
    PRODUCT_DETAILS_REQUEST, 
    PRODUCT_DETAILS_SUCCESS, 
    PRODUCT_DETAILS_FAIL,
    PRODUCT_DELETE_REQUEST,
    PRODUCT_DELETE_SUCCESS,
    PRODUCT_DELETE_FAIL,
    PRODUCT_REVIEW_SAVE_REQUEST,
    PRODUCT_REVIEW_SAVE_SUCCESS,
    PRODUCT_REVIEW_SAVE_FAIL,
    PRODUCT_REVIEW_SAVE_RESET
} from "../constants/productConstants";



const listProducts = () => async (dispatch) => {
    try {
    dispatch({ type: PRODUCT_LIST_REQUEST}); // 
    const {data} = await Axios.get('/storeProducts');
    dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data}) // when get data from request, return data
    }
    catch(error) {

    dispatch({type: PRODUCT_LIST_FAIL, payload: error.message })
    }

}









const saveProduct = (product) => async (dispatch, getState) => {
    const { userSignin: { userInfo }} = getState();
    
    const requestPost = {
        method: 'POST',
        url: '/storeProducts/add',
        data: product,
        headers:  (userInfo && userInfo.token) ? {
            Authorization: 'Bearer ' + userInfo.token
        } : {}
    }

    const requestPatch = {
        method: 'PATCH',
        url: `/storeProducts/update/${product._id}`,
        data: product,
        headers:  (userInfo && userInfo.token) ? {
            Authorization: 'Bearer ' + userInfo.token
        } : {}
    }
    
    
    try {
        dispatch({ type: PRODUCT_SAVE_REQUEST, payload: product});
        if(!product._id) {

            const { data } = await Axios(requestPost)
            if(data) {

                dispatch({ type: PRODUCT_SAVE_SUCCESS, payload: data});
            }

        } else {

        const { data } = await Axios(requestPatch)
            if(data) {

                dispatch({ type: PRODUCT_SAVE_SUCCESS, payload: data});
            }
        }


    } catch (error) {
        dispatch({type: PRODUCT_SAVE_FAIL, payload: error.message});
    }
}



// const saveProduct = (product) => async (dispatch, getState) => {
//     try {
//         dispatch({ type: PRODUCT_SAVE_REQUEST, payload: product});
//         const { userSignin: { userInfo }} = getState();
//         if(!product._id) {

//             const { data } = await Axios.post('/storeProducts/add', product, {
//                 headers: {
//                     Authorization: 'Bearer ' + userInfo.token
//                 }
//             });

//         dispatch({ type: PRODUCT_SAVE_SUCCESS, payload: data});
//         } else {

//         const { data } = await Axios.patch('/storeProducts/update/' + product._id, product, {
//             headers: {
//                 Authorization: 'Bearer ' + userInfo.token
//             }
//         });

//         dispatch({ type: PRODUCT_SAVE_SUCCESS, payload: data});
//         }


//     } catch (error) {
//         dispatch({type: PRODUCT_SAVE_FAIL, payload: error.message});
//     }
// }





const deleteProduct = (productId) => async (dispatch, getState) => {
    const { userSignin: { userInfo } } = getState();

    const requestReg = {
        method: 'PATCH',
        url: `/storeProducts/delete/${productId}`,
        headers:  (userInfo && userInfo.token) ? {
            Authorization: 'Bearer ' + userInfo.token
        } : {}
    }



    try {
        dispatch({type: PRODUCT_DELETE_REQUEST, payload: productId});
        console.log(userInfo)
        const { data } = await Axios(requestReg);
        if (data) {

            dispatch({type: PRODUCT_DELETE_SUCCESS, payload: data});
        }
    } catch(error) {
        dispatch({type: PRODUCT_DELETE_FAIL, payload:          error.response && error.response.data.message ?
            error.response.data.message
             :
            error.message })

    }
}




// const deleteProduct = (productId) => async (dispatch, getState) => {
//     const { userSignin: { userInfo } } = getState();
//     dispatch({type: PRODUCT_DELETE_REQUEST, payload: productId});
//     try {
//         console.log(userInfo)
//         const { data } = await Axios.patch('/storeProducts/delete/' + productId, {
//         headers: {
//           Authorization: 'Bearer ' + userInfo.token
//         }
//         });
//         dispatch({type: PRODUCT_DELETE_SUCCESS, payload: data});
//     } catch(error) {
//         dispatch({type: PRODUCT_DELETE_FAIL, payload: error.message })

//     }
// }


const detailsProduct = (productId) => async (dispatch) => {
    try {
        dispatch({type: PRODUCT_DETAILS_REQUEST, payload: productId});
        const {data} = await Axios.get('/storeProducts/' + productId)
        dispatch({type: PRODUCT_DETAILS_SUCCESS, payload: data});
    } catch(error) {
        //*  originally 'payload: error.message' .... added as changes
        dispatch({type: PRODUCT_DETAILS_FAIL, 
            payload:
             error.response && error.response.data.message ?
            error.response.data.message
             :
            error.message
        })
    }
}

const saveProductReview = (productId, review) => async (dispatch, getState) => {
    try {
        const {userSignin:{userInfo:{token}}} = getState();
        dispatch({type: PRODUCT_REVIEW_SAVE_REQUEST, payload: review});
        const {data} = await Axios.post(`/storeProducts/${productId}/reviews`, review, {
            headers: {
                Authorization: 'Bearer ' + token,
            },
          }
        );
        dispatch({type: PRODUCT_REVIEW_SAVE_SUCCESS, payload: data})
    } catch(error) {
        //report error
        dispatch({type: PRODUCT_REVIEW_SAVE_FAIL, payload: error.message})
    }
}

export { listProducts, detailsProduct, saveProduct, deleteProduct, saveProductReview }