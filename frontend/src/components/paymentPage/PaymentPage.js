import React, { useState} from 'react';
import styles from './PaymentPage.module.scss';
import { useDispatch, useSelector} from 'react-redux';
import Footer from '../footer/Footer';
import { savePayment } from '../../actions/cartActions';
import CheckoutSteps from '../checkoutSteps/CheckoutSteps';



const PaymentPage = (props) => {
    const cart = useSelector(state => state.cart);
    const { shipping} = cart;

    const userSignin = useSelector(state => state.userSignin);
    const { userInfo } = userSignin;


    if(!userInfo) {
        props.history.push('/signin');
    }

    if(userInfo && !shipping.address) {
        props.history.push('/shipping');
    }

    if(userInfo && !cart.cartItems.length) {
        props.history.push('/cart');
    }


    const [paymentMethod, setPaymentMethod] = useState('');

    const dispatch = useDispatch();


    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(savePayment({paymentMethod}));
        props.history.push('placeorder')
    }

    return(
    <React.Fragment>
    <div>
        <CheckoutSteps step1 step2 step3></CheckoutSteps>
        

            <div className={styles.form}>
            <form onSubmit={submitHandler} className={styles.formContainer} >
            <ul className={styles.formSubContainer}>
                <li>
                    <h2 className={styles.title}>Payment</h2>
                </li>
                <li>
                    <div className={styles.radioFlex}>
                        <input type="radio" name="paymentMethod" id="paymentMethod" value="PayPal" onChange={(e) => setPaymentMethod(e.target.value)}></input>
                        <label htmlFor="paymentMethod" >
                            Paypal
                        </label>
                    </div>
                </li>

                <li>
                    <button type="submit" className={styles.button}>Continue</button>
                </li>
            </ul>
            </form>
        </div>
    </div>




    <Footer/>
    </React.Fragment>
      
    )
}

export default PaymentPage;