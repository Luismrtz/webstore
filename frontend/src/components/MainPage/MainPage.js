import React, {useState, useEffect} from 'react';

import styles from './MainPage.module.scss';
import {Link} from 'react-router-dom';
import Banner from '../Banner/Banner';
import Loading from '../spinner/Loading'
import MainSales from '../mainPageSales/MainSales';
import ErrorMsg from '../errorMsg/ErrorMsg';
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
}, [dispatch])



//const isGlobalSpinnerOn = useContext(LoadContext);

const [isToggled] = useState(true);



    return loading ? <div><Loading/></div> :
    error || !banners ? <ErrorMsg variant="danger">{error}</ErrorMsg> :
    (

      <React.Fragment>



          
          {/* //todo  Banner  */}
          <Banner banners={banners}/>


        <div className={styles.displayContainer}>
            <div className={styles.imgOverlay}>
                    <img className={styles.image} src='images/mugs/speckles.jpg' alt="duckens"/>
                    <Link to={'/shop/cups'}  className={styles.overlayWrapper}></Link> 
                    <div className={styles.bwrapper}>
                        <Link to={'/shop/cups'} className={styles.mainButton}>Cups</Link>
                    </div>
          
            </div>

            <div className={styles.imgOverlay}>
                    <img className={styles.image} src='images/mugs/morning.jpg' alt="duckens"/>
                    <Link to={'/shop'}  className={styles.overlayWrapper}></Link> 
                    <div className={styles.bwrapper}>
                        <Link to={'/shop'} className={styles.mainButton}>New Items</Link>
                    </div>
              
            </div>

            <div className={styles.imgOverlay}>
                    <img className={styles.image} src='images/jars/3jars.jpg' alt="duckens"/>
                    <Link to={'/shop/jars'}  className={styles.overlayWrapper}></Link> 
                    <div className={styles.bwrapper}>
                        <Link to={'/shop/jars'} className={styles.mainButton}>Jars</Link>
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
                            if (product.mainPage) {
                            return (
                                <MainSales  key={product._id} product={product} isToggled={isToggled}/>
                                ) 
                            }
                            return false;
                        })}
          </div>
                
              
        
          <Footer/>
      </React.Fragment>
    )
}

export default ProductList;