import React, {useEffect, useState} from 'react';
import styles from './PaymentPage.module.scss';
import {Link} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import cx from 'classnames';
import Footer from '../Footer/Footer';
import { savePayment } from '../../actions/cartActions';
import CheckoutSteps from '../CheckoutSteps/CheckoutSteps';


const PaymentPage = (props) => {

    const [paymentMethod, setPaymentMethod] = useState('');

    const dispatch = useDispatch();


    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(savePayment({paymentMethod}));
        props.history.push('placeorder')
    }

    // return loading ? <div>Loading...</div> :
    // error || !product ? <div>{error}</div> :
    return(
    <React.Fragment>
    <div>
        <CheckoutSteps step1 step2 step3></CheckoutSteps>
        

            <div className={styles.form}>
            <form onSubmit={submitHandler}>
            <ul className={styles.formContainer}>
                <li>
                    <h2 className={styles.title}>Payment</h2>
                </li>
                <li>
                    <div>
                        <input type="radio" name="paymentMethod" id="paymentMethod" value="paypal" onChange={(e) => setPaymentMethod(e.target.value)}></input>
                        <label htmlFor="paymentMethod">
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