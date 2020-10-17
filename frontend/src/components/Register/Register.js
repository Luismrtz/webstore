import React, {useEffect, useState} from 'react';
import styles from './Register.module.scss';
import {Link} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import Footer from '../Footer/Footer';
import { register } from '../../actions/userActions';


const Register = (props) => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');
    const userRegister = useSelector(state => state.userRegister);
    const {loading, userInfo, error} = userRegister;
    const dispatch = useDispatch();
    const redirect = props.location.search?props.location.search.split("=")[1]:'/';
    useEffect(() => {
     if (userInfo) {
         props.history.push(redirect);
     }
        return () => {
            //
        }
    }, [userInfo])

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(register(name, email, password));
    }

    // return loading ? <div>Loading...</div> :
    // error || !product ? <div>{error}</div> :
    return(
    <React.Fragment>
        <div className={styles.form}>
            <form onSubmit={submitHandler}>
            <ul className={styles.formContainer}>
                <li>
                    <h2 className={styles.title}>Create Account</h2>
                </li>
                <li>
                    {loading && <div>loading...</div>}
                    {error && <div>{error}</div>}
                </li>
                <li>
                    <label htmlFor="name">
                        Name
                    </label>
                    <input type="name" name="name" id="name" onChange={(e) => setName(e.target.value)}></input>
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
                    <label htmlFor="rePassword">
                        Re-enter password
                    </label>
                    <input type="password" id="rePassword" name="rePassword" onChange={(e) => setRePassword(e.target.value)}></input>
                </li>
                <li>
                    <button type="submit" className={styles.button}>Register</button>
                </li>
                <li className={styles.text}>
                    Already have an account? <Link to={redirect === '/' ? 'signin' : 'signin?redirect=' + redirect}>Sign-In</Link>
                </li>
            </ul>
            </form>
        </div>


    <Footer/>
    </React.Fragment>
      
    )
}

export default Register;