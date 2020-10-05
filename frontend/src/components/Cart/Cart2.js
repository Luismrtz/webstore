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

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Your Cart</h1>

            <div className={styles.flex}>
                {cartItems.lengdiv === 0 ? 
                <div>
                    Cart is empty
                </div> 
                : (
                <div className={styles.table}>
                        <div className={cx(styles.spacing, styles.categories)}>
                            
                                <div className={styles.itemRemove}></div>
                                <div className={styles.itemThumbnail}></div>
                                <div className={styles.itemName}>Product</div>
                                <div className={cx(styles.itemPrice)}>Price</div>
                                <div className={cx(styles.itemQuantity)}>Quantity</div>
                                <div className={cx( styles.total, styles.hideShow)}>subtotal</div>
                            
                        </div>
                    {cartItems.map(item => 
                        <div className={cx(styles.spacing, styles.spacingItems )} key={item.id}>

                                <div className={styles.itemRemove}><button type="button" className={styles.btn} onClick={ () => removeFromCartHandler(item.id)}>
                                           X
                                        </button></div>
                                <div className={cx(styles.imgC, styles.itemThumbnail)}><img className={styles.img} src={'/' + (item ? (item.image) : 'images/antique.jpg')} alt="product"></img></div>
                                <div className={cx(styles.itemName)}>
                                
                                   <Link to={"/details/" + item.id }>
                                    {item.name}

                                   </Link>
                                    </div>

                                    {item.sale === false ? (<h2 className={styles.itemPrice}>${item.price}.00</h2>) : 
                                        // (<div className={styles.discountWrapper}> 
                                            <h2 className={styles.itemPrice}>${item.discount}.00</h2>
                                            // <h2 className={styles.sale} style={{textDecoration: 'line-through'}}>${item.price}.00</h2>
                                        // </div>) 
                                        }
                                {/* <div className={styles.itemPrice}>{item.price}</div> */}



                                <div className={styles.itemQuantity}>
                                    Qty:
                                        <select value={item.qty} onChange={(e) => dispatch(addToCart(item.id, Number(e.target.value)))}>
                                            {[...Array(item.stock).keys()].map(x => 
                                                <option key={x + 1} value={x + 1}>{x + 1}</option>
                                                )}
                                        </select>
                                  
                                </div>
                                <div className={cx(styles.total, styles.hideShow)}>{(item.sale ? item.discount : item.price) * item.qty}</div>

                        </div>
                        
                    
                    )}
                    <div className={styles.cartAction}>
                        <h3>
                            subtotal ( {cartItems.reduce((a,c) => a + c.qty, 0)} items)
                            :
                               ${cartItems.reduce((a,c) => a + (c.sale === true ? c.discount : c.price) * c.qty, 0)}
                        </h3>
                        <button onClick={checkoutHandler} className={styles.btnPrimary} disabled={cartItems.length ===0}>
                            Checkout
                        </button>
                    </div>
                </div>
                )}

            </div>


<Footer/>
        </div>
    )
}

export default Cart;