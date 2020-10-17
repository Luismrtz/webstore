import React, {useEffect} from 'react';


import styles from './Cart.module.scss'
import Footer from '../Footer/Footer';
import { addToCart, removeFromCart } from '../../actions/cartActions';
import { useDispatch, useSelector } from 'react-redux';
import cx from 'classnames';
import {Link} from 'react-router-dom';
const Cart = (props) => {

    const cart = useSelector(state => state.cart);

    const {cartItems} = cart;

    const productId = props.match.params.id;
    const qty = props.location.search ? Number(props.location.search.split("=")[1]) : 1;
    // const num = Number(numItem)
    const dispatch = useDispatch();
    const removeFromCartHandler = (productId) => {
        dispatch(removeFromCart(productId))
    }
    useEffect(() => {
        if(productId) {
            dispatch(addToCart(productId, qty))
        }
    }, []);

    const checkoutHandler = () => {
        props.history.push("/signin?redirect=shipping");
    }

    // console.log(cartItems.length);

    const itemsPrice =   cartItems.reduce((a,c) => a + (c.sale === true ? c.discount : c.price) * c.qty, 0);
    const shippingPrice = itemsPrice > 50 ? 0 : 10;
    const taxPrice = 0.15 * itemsPrice;
    const totalPrice = itemsPrice + shippingPrice + taxPrice;



    return (
        <div className={styles.mainContainer}>
            <h1 className={styles.title}>YOUR CART</h1>

            <div className={styles.heightContainer}>
                {cartItems.lengdiv === 0 ? 
                <div>
                    Cart is empty
                </div> 
                : 
                    <div className={styles.maxWidth}>
                 <ul className={styles.wrapper}>
                        <li className={styles.fontSize}>
                            <h3>Cart</h3>
                            <h3>Price</h3>
                        </li>
                    {cartItems.map(item => 
                        <li className={styles.cartItems} key={item.id}>

                                    <div className={styles.cartImage}>
                                         <Link to={"/details/" + item.id }>
                                            <img className={styles.img} src={'/' + (item ? (item.image) : 'images/antique.jpg')} alt="product"></img>
                                        </Link>
                                     </div>

                                     <div className={styles.itemFlex}>

                                        <h3 className={cx(styles.fontSizeSm)}>
                                    
                                            <Link to={"/details/" + item.id }>
                                                {item.name}

                                            </Link>
                                        </h3>
                                        <div className={styles.itemQuantity}>
                                            Qty:
                                                <select value={item.qty} onChange={(e) => dispatch(addToCart(item.id, Number(e.target.value)))}>
                                                    {[...Array(item.stock).keys()].map(x => 
                                                        <option key={x + 1} value={x + 1}>{x + 1}</option>
                                                        )}
                                                </select>
                                        
                                      </div>

                                        <div className={styles.itemRemove}>      
                                            <button type="button" className={cx(styles.btnRemove,styles.fontSizeSm)} onClick={ () => removeFromCartHandler(item.id)}>
                                                Remove
                                            </button>
                                        </div>
                                    </div>

    


  
                                <div className={cx(styles.cartPrice)}>${(item.sale ? item.discount : item.price) * item.qty}.00</div>

                        </li>
                    )}

                         </ul>

                        <div className={styles.subTotalDetails}>
                            <ul>
                                <li>
                                    <h3 className={styles.fontSize}>Order Summary</h3>
                                </li>
                                <li>
                                    <div className={styles.fontSizeSm}>Items</div>
                                    <div className={styles.fontSizeSm}>${itemsPrice}</div>
                                </li>
                                <li>
                                    <div className={styles.fontSizeSm}>Shipping</div>
                                    <div className={styles.fontSizeSm}>${`${cartItems.length === 0 ? '0' : shippingPrice}`}</div>
                                </li>
                                <li>
                                    <div className={styles.fontSizeSm}>Tax</div>
                                    <div className={styles.fontSizeSm}>${taxPrice}</div>
                                </li>
                                <li>
                                    <div className={styles.fontSize}>Order Total</div>
                                    <div className={styles.fontSize}>${`${cartItems.length === 0 ? '0' : totalPrice}`}</div>
                                </li>
                                
                                    <button onClick={checkoutHandler} className={cx(styles.btnPrimary, styles.maxWidth)} disabled={cartItems.length ===0}>
                                        Checkout
                                    </button>
                                
                            </ul>
                        
                        </div>
                  
                    </div>
                  
                
                }

            </div>


<Footer/>
        </div>
    )
}

export default Cart;