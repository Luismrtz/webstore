import React, {useEffect} from 'react';


import styles from './PlaceOrder.module.scss'
import Footer from '../Footer/Footer';
import { addToCart, removeFromCart } from '../../actions/cartActions';
import { useDispatch, useSelector } from 'react-redux';
import cx from 'classnames';
import {Link} from 'react-router-dom';
import CheckoutSteps from '../CheckoutSteps/CheckoutSteps';
import { createOrder } from '../../actions/orderActions';
const PlaceOrder = (props) => {

    const cart = useSelector(state => state.cart);
    const {cartItems, shipping, payment} = cart;
    const orderCreate = useSelector(state => state.orderCreate);
    const { loading, success, error, order } = orderCreate;

    if(!shipping.address) {
        props.history.push('/shipping');
    }else if(!payment.paymentMethod) {
        props.history.push('/payment');
    }

    const itemsPrice =   cartItems.reduce((a,c) => a + (c.sale === true ? c.discount : c.price) * c.qty, 0);
    const shippingPrice = itemsPrice > 100 ? 0 : 10;
    const taxPrice = 0.15 * itemsPrice;
    const totalPrice = itemsPrice + shippingPrice + taxPrice;


    const dispatch = useDispatch();



    const placeOrderHandler = () => {
        dispatch(createOrder({
             orderItems: cartItems, shipping, payment, itemsPrice, shippingPrice,
            taxPrice, totalPrice
        }));
    }
  

  

    useEffect(() => {
        if(success) {
            props.history.push('/order/' + order._id);
        }
    }, [success]);
    
    console.log(cart)
    console.log(orderCreate);
    console.log(order)
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
                    <li>
                    <button onClick={placeOrderHandler} className={cx(styles.btnPrimary, styles.fullWidth)} disabled={cartItems.length ===0}>
                         Checkout
                    </button>
                    </li>
                    <li>
                        <h3 className={styles.fontSize}>Order Summary</h3>
                    </li>
                    <li>
                        <div className={styles.fontSizeSm}>Items</div>
                        <div className={styles.fontSizeSm}>${itemsPrice}</div>
                    </li>
                    <li>
                        <div className={styles.fontSizeSm}>Shipping</div>
                        <div className={styles.fontSizeSm}>${shippingPrice}</div>
                    </li>
                    <li>
                        <div className={styles.fontSizeSm}>Tax</div>
                        <div className={styles.fontSizeSm}>${taxPrice}</div>
                    </li>
                    <li>
                        <div className={styles.fontSize}>Order Total</div>
                        <div className={styles.fontSize}>${totalPrice}</div>
                    </li>
                </ul>
            
            </div>

        </div>
    <Footer/>
       
        </div>


     
    )
}

export default PlaceOrder;