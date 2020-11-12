import React, {useEffect} from 'react';
import styles from './PlaceOrder.module.scss'
import Footer from '../Footer/Footer';
import Loading from '../spinner/Loading';
import ErrorMsg from '../ErrorMsg/ErrorMsg';
import { useDispatch, useSelector } from 'react-redux';
import cx from 'classnames';
import {Link} from 'react-router-dom';
import CheckoutSteps from '../CheckoutSteps/CheckoutSteps';
import { createOrder } from '../../actions/orderActions';
import { ORDER_CREATE_RESET } from '../../constants/orderConstants';
const PlaceOrder = (props) => {

//! todo
//todo CONSOLE ERROR
//*index.js:1 Warning: Cannot update during an existing state transition
//* (such as within `render`).
//* Render methods should be a pure function of props and state.

    const cart = useSelector(state => state.cart);
    const {cartItems, shipping, payment} = cart;

    const userSignin = useSelector(state => state.userSignin);
    const { userInfo } = userSignin;

    const orderCreate = useSelector(state => state.orderCreate);
    const { loading, success, error, order } = orderCreate;


    if(!userInfo) {
        props.history.push('/signin');
    }
    if(userInfo && !cart.cartItems.length) {
        props.history.push('/cart');
    }
    if(userInfo && !shipping.address) {
        props.history.push('/shipping');
    }
    if(userInfo && !payment) {
        props.history.push('payment');
    }




    const round2 = (num) => Number(num.toFixed(2)); // round to 2 decimal

    const itemsPrice =   round2(cartItems.reduce((a,c) => a + (c.sale === true ? c.discount : c.price) * c.qty, 0));
    const shippingPrice = itemsPrice > 50 ? round2(0) : round2(10);
    const taxPrice = round2(0.15 * itemsPrice);
    const totalPrice = round2(itemsPrice + shippingPrice + taxPrice);


    const dispatch = useDispatch();



    const placeOrderHandler = () => {
        dispatch(createOrder({...cart,
             orderItems: cart.cartItems, shipping, payment, itemsPrice, shippingPrice,
             taxPrice, totalPrice
        }));
    }
  
//     dispatch(createOrder({
//         orderItems: cartItems, shipping, payment, itemsPrice, shippingPrice,
//        taxPrice, totalPrice
//    }));

  

    useEffect(() => {
        if(success) {
            props.history.push('/order/' + order._id);
            dispatch({type: ORDER_CREATE_RESET})
        }
    }, [dispatch,props.history, order, success]);
    
    return (

        <div>
            <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
            <div className={styles.placeorder}>
       

            <div className={styles.placeorderInfo}>
                <div>
                    <h3 className={styles.fontSize}>
                        Shipping
                    </h3>
                    <div>
                        {cart.shipping.address}, {cart.shipping.city},
                        {cart.shipping.postalCode}, {cart.shipping.country},
                    </div>
                </div>
                <div>
                    <h3 className={styles.fontSize}>
                        Payment
                    </h3>
                    <div>
                        Payment Method: {cart.payment.paymentMethod}
                    </div>
                </div>



                <div>

                <ul className={styles.cartContainer}>

                    <li>
                        <h3 className={styles.fontSize}>Shopping cart</h3>
                        <h3 className={cx(styles.fontSize)}>Price</h3>
                    </li>
                {cartItems.length === 0 ? 
                    <div>
                        Cart is empty
                    </div> 
                : 
                 

                    cartItems.map(item => 
                    <li  key={item.id}>

       
                        <div className={styles.cartImage}>
                        <Link to={"/details/" + item.id }>
                            <img className={styles.img} src={'/' + (item ? (item.image) : 'images/antique.jpg')} alt="product"></img>
                            </Link>
                        </div>


                        <div className={styles.itemFlex}>
                            <div className={cx(styles.cartName, styles.fontSizeSm)}>
                            
                            <Link to={"/details/" + item.id }>
                                {item.name}

                            </Link>
                            </div>

                            <div className={cx(styles.cartQty,styles.fontSizeSm)}>
                                    Qty: {item.qty}
                            </div>

                        </div>
                    
                        <div className={cx(styles.cartPrice)}>${((item.sale ? item.discount : item.price) * item.qty).toFixed(2)}</div>
                
                    </li>

                )}

                </ul>
                </div>
            </div>


            <div className={styles.placeorderAction}>
                <ul>
                    <li>
                    <button onClick={placeOrderHandler} className={cx(styles.btnPrimary, styles.fullWidth)} disabled={cartItems.length ===0}>
                         Checkout
                    </button>
                    </li>
                    {
                        loading && <Loading/>
                    } 
                    {
                        error && <ErrorMsg variante="danger">{error}</ErrorMsg>
                    }
                    <li>
                        <h3 className={styles.fontSize}>Order Summary</h3>
                    </li>
                    <li>
                        <div className={styles.fontSizeSm}>Items</div>
                        <div className={styles.fontSizeSm}>${itemsPrice.toFixed(2)}</div>
                    </li>
                    <li>
                        <div className={styles.fontSizeSm}>Shipping</div>
                        <div className={styles.fontSizeSm}>${shippingPrice.toFixed(2)}</div>
                    </li>
                    <li>
                        <div className={styles.fontSizeSm}>Tax</div>
                        <div className={styles.fontSizeSm}>${taxPrice.toFixed(2)}</div>
                    </li>
                    <li>
                        <div className={styles.fontSize}>Order Total</div>
                        <div className={styles.fontSize}>${totalPrice.toFixed(2)}</div>
                    </li>
                </ul>
            
            </div>

        </div>
    <Footer/>
       
        </div>


     
    )
}

export default PlaceOrder;