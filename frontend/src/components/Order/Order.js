import React, {useEffect} from 'react';
import styles from './Order.module.scss'
import Footer from '../Footer/Footer';
import { useDispatch, useSelector } from 'react-redux';
import cx from 'classnames';
import {Link} from 'react-router-dom';
import { createOrder, detailsOrder, payOrder } from '../../actions/orderActions';
import PaypalButton from '../PaypalButton/PaypalButton';

const Order = (props) => {
    const orderPay = useSelector(state => state.orderPay);
    const {loading: loadingPay, success: successPay, error: errorPay } = orderPay;
    const dispatch = useDispatch();
    useEffect(() => {
        if (successPay) {
            props.history.push('/profile');
        } else {
            dispatch(detailsOrder(props.match.params.id));
        }
        return () => {
          
        };
    }, [successPay]);

    const handleSuccessPayment = (paymentResult) => {
        dispatch(payOrder(order, paymentResult));
    }

    const orderDetails = useSelector(state => state.orderDetails);
    const { loading, order, error } = orderDetails;
    // const payHandler = () => {}

    // return loading ? <div>Loading...</div> :
    // error || !products ? <div>{error}</div> :
    // (

    console.log(order)
        return loading ? <div>Loading...</div> :
        error ? <div>{error}</div> :
        (
        <div>
           
            <div className={styles.placeorder}>
       

            <div className={styles.placeorderInfo}>
                <div>
                    <h3 className={styles.fontSize}>
                        Shipping
                    </h3>
                    <div>
                        {order.shipping.address}, {order.shipping.city},
                        {order.shipping.postalCode}, {order.shipping.country},
                    </div>
                    <div>
                        {order.isDelivered ? "Delivered at " + order.deliveredAt : "Not Delivered."}
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
                        {order.isPaid ? "Paid at " + order.paidAt : "Not Paid."}
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

                        {/* <div className={styles.itemRemove}>      <button type="button" className={styles.btn} onClick={ () => removeFromCartHandler(item.id)}>
                                    X
                                </button></div> */}
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
                    
                        <div className={cx(styles.cartPrice)}>${(item.sale ? item.discount : item.price) * item.qty}.00</div>
                
                    </li>

                )}

                </ul>
                </div>
            </div>


            <div className={styles.placeorderAction}>
                <ul>
                    <li className={styles.placeorderActionPayment}>
                        {!order.isPaid && 
                        <PaypalButton
                         amount={order.totalPrice} 
                         onSuccess={handleSuccessPayment}/>
                         }
                    </li>
                    <li>
                        <h3 className={styles.fontSize}>Order Summary</h3>
                    </li>
                    <li>
                        <div className={styles.fontSizeSm}>Items</div>
                        <div className={styles.fontSizeSm}>${order.itemsPrice}</div>
                    </li>
                    <li>
                        <div className={styles.fontSizeSm}>Shipping</div>
                        <div className={styles.fontSizeSm}>${order.shippingPrice}</div>
                    </li>
                    <li>
                        <div className={styles.fontSizeSm}>Tax</div>
                        <div className={styles.fontSizeSm}>${order.taxPrice}</div>
                    </li>
                    <li>
                        <div className={styles.fontSize}>Order Total</div>
                        <div className={styles.fontSize}>${order.totalPrice}</div>
                    </li>
                </ul>
            
            </div>

        </div>
    <Footer/>
       
        </div>


     
    )
}

export default Order;