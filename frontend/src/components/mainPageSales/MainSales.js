import React, {useState} from 'react';
import styles from './MainSales.module.scss';
import {Link} from 'react-router-dom';
//import {ProductContext} from '../context/context';
//import {storeProducts} from '../api/data';
//import { findByDisplayValue } from '@testing-library/react';
import cx from 'classnames';
import PropTypes from 'prop-types';

const MainSales = ({product: {_id, title, img, info, price, type, inCart,sale, discount}, isToggled}) => {



    // const [info, setInfo] = useState({
    //     id,
    //     title,
    //     img,
    //     price,
    //     inCart
    // })
    //const [{id, title, img, info, price, inCart}, useData] = useState(product);
    // setSwoop()
   

    return  (
      
        <div className={(isToggled === true ? styles.container : styles.containerFlip)}>
           

            <div   className={styles.imgOverlay}>
              <img className={styles.image} src={'/' + img} alt="duckens"/>
              <div className={styles.overlayContainer}>
                    
                    <Link to={'/details/' + _id}  className={styles.overlay}></Link> 
                    <div className={styles.bwrapper}>
                            <Link to={'/details/' + _id} className={styles.button1}>Quick Shop</Link>
                            <Link  to="/cart"className={(isToggled === true ? styles.button2 :  styles.nope)}>Add to Cart</Link>
                            
                    </div>
                    <div className={styles.liked}>&#10084;</div> 
                            {/* <i class="fa fa-heart" aria-hidden="true"></i> */}
             </div>
                   

            {/* <ul className={cx(styles.center, styles.links)}>
                <li><Link to="/details">Account</Link></li>
                <li><Link to="/cart">Cart ( 1 )</Link></li>     
            </ul> */}
                    
            </div>
            <div className={styles.contents}>
                <div className={cx((isToggled === true ? styles.contDesc : styles.contNope))}>
                    <h1 className={styles.title}>{title}</h1>
                    <h2 className={styles.price}>${price}.00</h2>
                    <h3 className={(isToggled === true ? styles.nope : styles.descript)}>{info}</h3>
                  
                </div>
            
                <div className={(isToggled === true ? styles.nope : styles.listIcons)}>
                    <Link  to="/cart"className={styles.button2}>Add to Cart</Link>
                    <div className={styles.liked}>&#10084;</div> 
                    <div className={cx((sale === true ? styles.show : styles.none))}>
                        SALE
                    </div> 
                    <div> SALE</div>
                </div> 
            </div>
            
        </div> 
     
    )
}
export default MainSales;

MainSales.propTypes = {
    product: PropTypes.shape({
        _id: PropTypes.string,
        title: PropTypes.string,
        img: PropTypes.string,
        price: PropTypes.number,
        inCart: PropTypes.bool
    }).isRequired
}