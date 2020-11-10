import React, {useEffect, useState} from 'react';
import styles from './Shipping.module.scss';
import { useDispatch, useSelector} from 'react-redux';
import Footer from '../Footer/Footer';
import { saveShipping } from '../../actions/cartActions';
import Loading from '../spinner/Loading'
import ErrorMsg from '../ErrorMsg/ErrorMsg';
import CheckoutSteps from '../CheckoutSteps/CheckoutSteps';


const Shipping = (props) => {
    const userSignin = useSelector(state => state.userSignin);
    const { userInfo } = userSignin;
    const cart = useSelector(state => state.cart);
    const {shipping} = cart;
    if(!userInfo) {
        props.history.push('/signin');

    }
    if(userInfo && !cart.cartItems.length) {
        props.history.push('/cart');
    }
    
    console.log(cart.cartItems)
    console.log(shipping);
    console.log(userInfo)
    const [address, setAddress] = useState(shipping.address);
    const [city, setCity] = useState(shipping.city);
    const [country, setCountry] = useState(shipping.country);
    const [postalCode, setPostalCode] = useState(shipping.postalCode);

    const dispatch = useDispatch();


    const submitHandler = (e) => {
        e.preventDefault();
        //todo change to ({fullName, address, city, postalCode, country})
        dispatch(saveShipping({address, city, country, postalCode}));
        props.history.push('payment')
    }

    // return loading ? <div><Loading/></div> :
    // error || !product ? <ErrorMsg variant="danger">{error}</ErrorMsg> :
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
                    <input value={address || ''} type="text" name="address" id="address" onChange={(e) => setAddress(e.target.value)}></input>
                </li>
                <li>
                    <label htmlFor="city">
                        City
                    </label>
                    <input  value={city || ''} type="text" name="city" id="city" onChange={(e) => setCity(e.target.value)}></input>
                </li>                <li>
                    <label htmlFor="postalCode">
                        Postal Code
                    </label>
                    <input value={postalCode || ''} type="text" name="postalCode" id="postalCode" onChange={(e) => setPostalCode(e.target.value)}></input>
                </li>                <li>
                    <label htmlFor="country">
                        Country
                    </label>
                    <input value={country || ''} type="text" name="country" id="country" onChange={(e) => setCountry(e.target.value)}></input>
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