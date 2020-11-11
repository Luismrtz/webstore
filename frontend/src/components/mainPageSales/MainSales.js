import React from 'react';
import styles from './MainSales.module.scss';
import {Link} from 'react-router-dom';

import cx from 'classnames';
import PropTypes from 'prop-types';

const MainSales = ({product: {_id, title, img, info, price, type, inCart, sale, discount, newItem}, isToggled}) => {



   const percentage =100 - (discount/price)*100;

    return  (
      
        <div className={styles.container}>
           

            <div   className={styles.imgOverlay}>
              <img className={styles.image} src={'/' + img} alt="duckens"/>
              {sale  &&  
                        (
                        <div className={styles.saleWrapper}>   
                            <div className={cx(styles.circle, styles.circleNum)}> 
                                <h2 className={styles.saleString}>SALE</h2>
                            </div>
                            <div className={cx(styles.circle, styles.circleString)}> 
                                <h2 className={styles.price}>{percentage.toFixed(0)}%</h2>
                            </div>
                        </div>
                        ) }   

                        
                {newItem  &&  
                        (
                        <div className={styles.saleWrapper}>   
                            <div className={cx(styles.circle, styles.circleNum)}> 
                                <h2 className={styles.saleString}>NEW</h2>
                            </div>
                        </div>
                        ) }    
                               
              <div className={styles.overlayContainer}>
                    
                    <Link to={'/details/' + _id}  className={styles.overlay}></Link> 
                    <div className={styles.bwrapper}>
                            <Link to={'/details/' + _id} className={styles.button1}>Item Details</Link>
                    
                            
                    </div>
             </div>
      
            </div>
            <div className={styles.contents}>
                <div className={ styles.contDesc}>
                    <h1 className={styles.title}>{title}</h1>
                {sale === false ? (<h2 className={styles.price}>${price.toFixed(2)}</h2>) : 
                        (<div className={styles.discountWrapper}> 
                            <h2 className={styles.price}>${discount.toFixed(2)}</h2>
                            <h2 className={styles.sale}>${price.toFixed(2)}</h2>
                        </div>) }
                    <h3 className={ styles.nope}>{info}</h3>
                  
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