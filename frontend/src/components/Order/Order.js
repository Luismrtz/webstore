import React, {useEffect, useState} from 'react';
import Axios from 'axios';
import {PayPalButton} from 'react-paypal-button-v2'
import styles from './Order.module.scss'
import Footer from '../footer/Footer';
import { useDispatch, useSelector } from 'react-redux';
import cx from 'classnames';
import Loading from '../spinner/Loading'
import ErrorMsg from '../errorMsg/ErrorMsg';
import {Link} from 'react-router-dom';
import { detailsOrder, payOrder, deliverOrder } from '../../actions/orderActions';
import { ORDER_DELIVER_RESET, ORDER_PAY_RESET } from '../../constants/orderConstants';
// import PaypalButton from '../PaypalButton/PaypalButton';

const Order = (props) => {
    const orderPay = useSelector(state => state.orderPay);
    const {loading: loadingPay, success: successPay, error: errorPay } = orderPay;
    const orderDeliver = useSelector(state => state.orderDeliver);
    const {loading: loadingDeliver, success: successDeliver, error: errorDeliver } = orderDeliver;
  
    const [sdkReady, setSdkReady] = useState(false);
    const orderId = props.match.params.id;
    const userSignin = useSelector(state => state.userSignin);
    const {userInfo} = userSignin;
    
    const orderDetails = useSelector(state => state.orderDetails);
    const { loading, order, error } = orderDetails;
    const dispatch = useDispatch();
    useEffect(() => {

        const addPaypalSdk = async() => {
            const result = await Axios.get("/config/paypal");
            const clientID = result.data;
            const script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = 'https://www.paypal.com/sdk/js?client-id=' + clientID;
            script.async = true;
            script.onload = () => {
                setSdkReady(true);
            }
            document.body.appendChild(script);
        };

        if(!order || successPay || successDeliver || (order && order._id !== orderId)) {
           dispatch({ type: ORDER_PAY_RESET});
           dispatch({ type: ORDER_DELIVER_RESET});
            dispatch(detailsOrder(orderId));
        } else {
            if(!order.isPaid) {
                if(!window.paypal) {
                    addPaypalSdk();
                } else {
                    setSdkReady(true);
                }
            }
        }

        // if (successPay) {
        //     props.history.push('/profile');
        // } else {
        //     dispatch(detailsOrder(orderId));
        // }
        // return () => {
          
        // };
    }, [order, orderId, dispatch, sdkReady, successPay, successDeliver]);

    const successPaymentHandler = (paymentResult) => {
        dispatch(payOrder(order, paymentResult));
    }

    const deliverHandler = () => {
        dispatch(deliverOrder(order._id))
    }



        return loading ? <div><Loading/></div> :
        error ? <ErrorMsg variant="danger">{error}</ErrorMsg> :
        (
        <div>
           
            <div className={styles.placeorder}>
       

            <div className={styles.placeorderInfo}>
                <div>
                    <h3 className={styles.fontSize}>
                        Shipping
                    </h3>
                    <div>
                        {/* <strong>Name: </strong> {order.shipping.name} <br/>*/}
                        <strong>Address: </strong>{order.shipping.address}, {order.shipping.city},
                        {order.shipping.postalCode}, {order.shipping.country},
                    </div>
                    <div>
                        {order.isDelivered ? <ErrorMsg variant="success">Delivered at + {order.deliveredAt}</ErrorMsg> : 
                        <ErrorMsg variant="danger2">Not Delivered.</ErrorMsg>}
                    </div>
                </div>
                <div>
                    <h3 className={styles.fontSize}>
                        Payment
                    </h3>
                    <div>
                        Payment Method: {order.payment.paymentMethod}
                    </div>
                    <div>
                    {order.isPaid ? <ErrorMsg variant="success">Paid at + {order.paidAt}</ErrorMsg> : 
                        <ErrorMsg variant="danger2">Not Paid.</ErrorMsg>}
                    </div>
                </div>



                <div>

                <ul className={styles.cartContainer}>

                    <li>
                        <h3 className={styles.fontSize}>Shopping cart</h3>
                        <h3 className={cx(styles.fontSize)}>Price</h3>
                    </li>
                {order.orderItems.length === 0 ? 
                    <div>
                        Cart is empty
                    </div> 
                : 
                 

                    order.orderItems.map(item => 
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
                    
                        {!order.isPaid && (
                          <li className={styles.placeorderActionPayment}>
                                {!sdkReady ? (<Loading></Loading>) : ( 
                                    <>
                                    {errorPay && <ErrorMsg variant="danger2">{errorPay}</ErrorMsg>}
                                    {loadingPay && <Loading></Loading>}
                                    <PayPalButton amount={order.totalPrice} onSuccess={successPaymentHandler}>
                                    </PayPalButton>
                                    </>
                                )
                                }
                              
                            </li>
                        )
                        // <PaypalButton
                        //  amount={order.totalPrice} 
                        //  onSuccess={handleSuccessPayment}/>
                         }

                    
                    <li>
                        <h3 className={styles.fontSize}>Order Summary</h3>
                    </li>
                    <li>
                        <div className={styles.fontSizeSm}>Items</div>
                        <div className={styles.fontSizeSm}>${order.itemsPrice.toFixed(2)}</div>
                    </li>
                    <li>
                        <div className={styles.fontSizeSm}>Shipping</div>
                        <div className={styles.fontSizeSm}>${order.shippingPrice.toFixed(2)}</div>
                    </li>
                    <li>
                        <div className={styles.fontSizeSm}>Tax</div>
                        <div className={styles.fontSizeSm}>${order.taxPrice.toFixed(2)}</div>
                    </li>
                    <li>
                        <div className={styles.fontSize}>Order Total</div>
                        <div className={styles.fontSize}>${order.totalPrice.toFixed(2)}</div>
                    </li>
                    {userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                             <li> 
                                 {loadingDeliver && <Loading></Loading>}
                                 {errorDeliver && <ErrorMsg variant="danger2">{errorDeliver}</ErrorMsg>}
                                 <button type="button" className={styles.button} onClick={deliverHandler}>
                                 Deliver Order
                                 </button>
                             </li>
                         )}
                </ul>
            
            </div>

        </div>
    <Footer/>
       
        </div>


     
    )
}

export default Order;