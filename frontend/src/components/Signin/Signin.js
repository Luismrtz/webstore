import React, {useEffect, useState} from 'react';
import styles from './Signin.module.scss';
import {Link} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import ErrorMsg from '../ErrorMsg/ErrorMsg';
import Footer from '../Footer/Footer';
import { signin } from '../../actions/userActions';
import Loading from '../spinner/Loading'


const Signin = (props) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const userSignin = useSelector(state => state.userSignin);
    const {loading, userInfo, error} = userSignin;
    const dispatch = useDispatch();
    const redirect = props.location.search?props.location.search.split("=")[1]:'/';
    useEffect(() => {
     if (userInfo) {
         props.history.push(redirect);
     }
        return () => {
            //
        }
    }, [props.history, redirect, userInfo])

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(signin(email, password));
    }

    // return loading ? <div><Loading/></div> :
    // error || !product ? <ErrorMsg variant="danger">{error}</ErrorMsg> :
    return(
    <React.Fragment>
        <div className={styles.form}>
            <form onSubmit={submitHandler}>
            <ul className={styles.formContainer}>
                <li>
                    <h2 className={styles.title}>Sign-In</h2>
                </li>
                <li>
                    {loading && <div><Loading/></div>}
                    {error && <ErrorMsg variant="danger">{error}</ErrorMsg>}
                </li>
                <li>
                    <label htmlFor="email">
                        Email
                    </label>
                    <input type="email" name="email" id="email" onChange={(e) => setEmail(e.target.value)}></input>
                </li>
                <li>
                    <label htmlFor="password">
                        Password
                    </label>
                    <input type="password" id="password" name="password" onChange={(e) => setPassword(e.target.value)}></input>
                </li>
                <li>
                    <button type="submit" className={styles.button}>Sign-in</button>
                </li>
                <li className={styles.text}>
                    New to Symbols?
                </li>
                <li>
                    <Link to={redirect === '/' ? 'register' : 'register?redirect=' + redirect} > <button className={styles.button}>Create an account</button></Link>
                </li>
            </ul>
            </form>
        </div>
        <div className={styles.testUserWrapper}>
        <div className={styles.testUser}>
        <h4>
                    Try one of these test accounts
                </h4>
            <ul>
                <li> Email: <div className={styles.nowrap}>
                     testing@test.com
                    </div>
                </li>
                <li>Password: <div className={styles.nowrap}>
                     testing
                    </div>
                </li>
            </ul>
            <ul>
                <li> Email: <div className={styles.nowrap}>
                     testing2@test.com
                    </div>
                </li>
                <li>Password: <div className={styles.nowrap}>
                     testing2
                    </div>
                </li>
            </ul>

        </div>
        </div>
 
     


    <Footer/>
    </React.Fragment>
      
    )
}

export default Signin;