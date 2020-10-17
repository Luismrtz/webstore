import React, { useContext, useState, useEffect} from 'react';

import styles from './MainPage.module.scss';
import {Link} from 'react-router-dom';
import Banner from '../Banner/Banner';
import MainSales from '../mainPageSales/MainSales';
import { useSelector, useDispatch } from 'react-redux';
import { bannerProduct} from '../../actions/bannerActions';
import { listProducts} from '../../actions/productActions';
import Footer from '../Footer/Footer';


const ProductList = () => {


//*let value = useContext(ProductContext);  every products had value.products/currentPosts, originally. But can just destructure
// let {products, isGlobalSpinnerOn} = useContext(ProductContext);

const pList = useSelector(state => state.pList);
const bList = useSelector(state => state.bList);
const { products, loading, error } = pList;
const { banners} = bList;
const dispatch = useDispatch();

useEffect(() => {
    dispatch(listProducts());
    dispatch(bannerProduct());
    return () => {
       //
    }
}, [])



//const isGlobalSpinnerOn = useContext(LoadContext);

const [isToggled] = useState(true);



    return loading ? <div>Loading...</div> :
    error || !banners ? <div>{error}</div> :
    (

      <React.Fragment>



          
          {/* //todo  Banner  */}
          <Banner banners={banners}/>


        <div className={styles.displayContainer}>
            <div className={styles.imgOverlay}>
                    <img className={styles.image} src='images/antique.jpg' alt="duckens"/>
                    <Link to={'/shop/accessories'}  className={styles.overlayWrapper}></Link> 
                    <div className={styles.bwrapper}>
                        <Link to={'/shop/accessories'} className={styles.mainButton}>Accessories</Link>
                    </div>
          
            </div>

            <div className={styles.imgOverlay}>
                    <img className={styles.image} src='images/antique.jpg' alt="duckens"/>
                    <Link to={'/shop'}  className={styles.overlayWrapper}></Link> 
                    <div className={styles.bwrapper}>
                        <Link to={'/shop'} className={styles.mainButton}>New Items</Link>
                    </div>
              
            </div>

            <div className={styles.imgOverlay}>
                    <img className={styles.image} src='images/antique.jpg' alt="duckens"/>
                    <Link to={'/shop/products'}  className={styles.overlayWrapper}></Link> 
                    <div className={styles.bwrapper}>
                        <Link to={'/shop/products'} className={styles.mainButton}>Products</Link>
                    </div>
                    
            </div>

        </div>
    
            <div className={styles.lineTitle}>
                <div className={styles.divLine}></div>
                <div className={styles.title}>
                     NEW & SPECIALS
                </div>
                <div className={styles.divLine}></div>
            </div>
            


            {/* //todo sales and new products          */}
          <div className={styles.grid}>
                        {products && products.map(product => {
                            if (product.mainPage === true) {
                            return (
                                <MainSales  key={product._id} product={product} isToggled={isToggled}/>
                                ) 
                            }
                        })}
          </div>
                
              
        
          <Footer/>
      </React.Fragment>
    )
}

export default ProductList;