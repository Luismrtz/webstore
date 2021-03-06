import React, {useState} from 'react';
import styles from './ProductItem.module.scss';
import {Link} from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import cx from 'classnames';
import PropTypes from 'prop-types';



const ProductItem = ({ product: {_id, title, img, info, price ,sale, discount, newItem}, isToggled} ) => {
    const [qty] = useState(1);
    const history = useHistory();
     const productId = _id;



    const handleAddToCart = () => {
 
        history.push(`/cart/${productId}?qty=${qty}`);
       // props.history.push("/cart/" + productId + "?qty=" + qty);
      };
    const percentage =100 - (discount/price)*100;
    return  (
      
        <div className={(isToggled === true ? styles.container : styles.containerFlip)}>
           

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
                <div className={cx((isToggled === true ? styles.contDesc : styles.contNope))}>
                    <h1 className={styles.title}>{title}</h1>

                    {sale === false ? (<h2 className={styles.price}>${price}.00</h2>) : 
                        (<div className={styles.discountWrapper}> 
                            <h2 className={styles.price}>${discount}.00</h2>
                            <h2 className={styles.sale} style={{textDecoration: 'line-through'}}>${price}.00</h2>
                        </div>) }


                    <h3 className={(isToggled === true ? styles.nope : styles.descript)}>{info}</h3>
                </div>
               
                <div className={(isToggled === true ? styles.nope : styles.listIcons)}>
                    <div onClick={handleAddToCart} className={styles.button2}>Add to Cart</div>
 
                </div> 
            </div>

        </div> 
     
    )
}
export default ProductItem;

ProductItem.propTypes = {
    product: PropTypes.shape({
        _id: PropTypes.string,
        title: PropTypes.string,
        img: PropTypes.string,
        price: PropTypes.number,
        inCart: PropTypes.bool
    }).isRequired
}