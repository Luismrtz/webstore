import React, {useEffect, useState} from 'react';
import styles from './Shipping.module.scss';
import {Link} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import cx from 'classnames';
import Footer from '../Footer/Footer';
import { saveShipping } from '../../actions/cartActions';
import CheckoutSteps from '../CheckoutSteps/CheckoutSteps';


const Shipping = (props) => {

    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [postalCode, setPostalCode] = useState('');

    const dispatch = useDispatch();


    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveShipping({address, city, country, postalCode}));
        props.history.push('payment')
    }

    // return loading ? <div>Loading...</div> :
    // error || !product ? <div>{error}</div> :
    return(
    <React.Fragment>
    <div>
        <CheckoutSteps step1 step2></CheckoutSteps>
        

            <div className={styles.form}>
            <form onSubmit={submitHandler} className={styles.formContainer} >
            <ul className={styles.formSubContainer}>
                <li>
                    <h2 className={styles.title}>Shipping</h2>
                </li>
                <li>
                    <label htmlFor="address">
                        Address
                    </label>
                    <input type="text" name="address" id="address" onChange={(e) => setAddress(e.target.value)}></input>
                </li>
                <li>
                    <label htmlFor="city">
                        City
                    </label>
                    <input type="text" name="city" id="city" onChange={(e) => setCity(e.target.value)}></input>
                </li>                <li>
                    <label htmlFor="postalCode">
                        Postal Code
                    </label>
                    <input type="text" name="postalCode" id="postalCode" onChange={(e) => setPostalCode(e.target.value)}></input>
                </li>                <li>
                    <label htmlFor="country">
                        Country
                    </label>
                    <input type="text" name="country" id="country" onChange={(e) => setCountry(e.target.value)}></input>
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

export default Shipping;