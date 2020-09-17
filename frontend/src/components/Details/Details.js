import React, {useEffect, useState} from 'react';
import styles from './Details.module.scss';
//import {productContext} from '../context/context';
import {Link} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
// import useListener from './Uselisteners';
import cx from 'classnames';
import Footer from '../Footer/Footer';
import { detailsProduct } from '../../actions/productActions';
//* Sync 
//* if match, 
const Details = (props) => {
    //todo STORE IN OWN CONTEXT? TO PASS THROUGH MORE THAN ONE FILE?
    //todo... but It is LINKED to a context already. Via storeproduct database. 
    //todo... so SHOULD I? or maybe include it inside the context with rtrMatch 
    //let {storeproduct} = useContext(ProductContext);


    const [qty, setQty] = useState(1);
    const pDetails = useSelector(state => state.pDetails);
    const {product, loading, error} = pDetails;
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(detailsProduct(props.match.params.id));
        return () => {
            //
        }
    }, [])
    console.log(product);
    //console.log(JSON.stringify(props.match.params.id))
    console.log(props.match.params.id)
    console.log(product)


    const handleAddToCart = () => {
        // method to redirect to another url
        props.history.push("/cart/" + props.match.params.id + "?qty=" + qty)
    }


    
    //const rtrMatch = storeproduct.find(item => item.title === props.match.params.id);
//     const [coords, setCoords] = useState({ x: 0, y: 0})
     
//    const handler = useCallback(({ clientX, clientY}) => {
//        setCoords({ x: clientX, y: clientY});
//    }, [setCoords]);

//    useListener('mousemove', handler);
   

   // const zoom = useRef(null);

  

//    const [coords, setCoords] = useState({ x: 0, y: 0 });

//    // Event handler utilizing useCallback ...
//    // ... so that reference never changes.
//    const handler = useCallback(
//      ({ clientX, clientY }) => {
//        // Update coordinates
//        setCoords({ x: clientX, y: clientY });
//      },
//      [setCoords]
//    );
 
//    // Add event listener using our hook
//    useListener('mousemove', handler);







    return loading ? <div>Loading...</div> :
    error || !product ? <div>{error}</div> :
    (
<div className={styles.container}>

                {/* <h1>the mouse is ({coords.x}, {coords.y})</h1> */}
    <div className={styles.titleContainer}>

        <h1 className={cx(styles.title, styles.center)}>{product.title}</h1>
         <h2 className={cx(styles.subTitle, styles.center)}>
         <Link to="/" className={styles.cStyle}>HOME</Link>&nbsp;/&nbsp; 
         <Link to="/shop" className={styles.cStyle}>SHOP</Link>&nbsp;/&nbsp; 
   {/* if (product.type === 2) { */}
             <Link to={product.type ===1 ? "/shop/products" : "/shop/accessories"} className={styles.cStyle}>
                  {product.type === 1 ? 'DUCKS' : 'ACCESSORIES'}
                 </Link>&nbsp;/&nbsp;{product.title}</h2>
            
   </div>


    
<div className={styles.grid}>

            {/* grid 1 */}
        <div className={styles.tinyGrid}>
            <img  className={styles.image1}  src={'/' + (product ? product.img : 'images/antique.jpg')} alt="duckens"></img>
            {/* <img className={styles.image2} src={'/' + product.img} alt="duckens"></img> */}
        </div>

            {/* grid 2 */}
        <div   className={styles.imgOverlay}>
            <img className={styles.image} src={'/' + (product ? product.img : 'images/antique.jpg')} alt="duckens"/>
        </div>
            {/* grid 3 */}
        <div className={styles.contents}>
            <div className={ styles.contDesc}>
                <h1 className={styles.title}>{product.title}</h1>
                <h2 className={styles.price}>${product.price}.00</h2>
                <h3 className={ styles.descript}>{product.info}</h3>
            </div>
        
            <div className={styles.listIcons}>
                <div className={styles.wrap}>
             
                    <div className={styles.qtext}>
                        Qty: <select className={styles.quantity} value={qty} onChange={(e) => {setQty(e.target.value)}}>
                            {[...Array(product.stock).keys()].map(x => 
                                <option key={x+1} value={x+1}>{x+1}</option>
                                )}
                            </select>
                    </div> 

                    {/* if greater than 0, show this. else do not render */}
                    {product.stock > 0 ? ( 
                    <div onClick={handleAddToCart} className={styles.button2}>Add to Cart</div>
                        ):(
                    <button onClick={handleAddToCart} disabled className={styles.button3}>Out of Stock</button>
                        )
                        
                        }
                    <div className={styles.liked}>&#10084;</div> 

                </div>
                <div className={styles.stock}>Status:{' '} {product.stock > 0 ? `${product.stock} In Stock` : "Unavailable"}</div>
                <div className={styles.category}>Categories: 
                            <Link to="/" className={styles.cStyle}>Ducks</Link>
                </div>
            </div> 
        </div>

</div> 
<Footer/>
</div>
      
    )
}

export default Details;