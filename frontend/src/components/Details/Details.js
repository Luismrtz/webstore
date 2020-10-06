import React, {useEffect, useState} from 'react';
import styles from './Details.module.scss';
//import {productContext} from '../context/context';
import {Link} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
// import useListener from './Uselisteners';
import cx from 'classnames';
import Footer from '../Footer/Footer';
import Rating from '../Rating/Rating';
import { detailsProduct, saveProductReview } from '../../actions/productActions';
import { PRODUCT_REVIEW_SAVE_RESET } from '../../constants/productConstants';

//* Sync 
//* if match, 
const Details = (props) => {
    //todo STORE IN OWN CONTEXT? TO PASS THROUGH MORE THAN ONE FILE?
    //todo... but It is LINKED to a context already. Via storeproduct database. 
    //todo... so SHOULD I? or maybe include it inside the context with rtrMatch 
    //let {storeproduct} = useContext(ProductContext);


    const [qty, setQty] = useState(1);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const pDetails = useSelector(state => state.pDetails);
    const userSignin = useSelector(state => state.userSignin);
    const {userInfo} = userSignin;
    const {product, loading, error} = pDetails;
    const productReviewSave = useSelector(state => state.productReviewSave);
    const {success: productSaveSucces} = productReviewSave;
    const dispatch = useDispatch();

    useEffect(() => {
        if(productSaveSucces) {
            alert('Review submitted successfully.');
            setRating(0);
            setComment('');

            dispatch({type: PRODUCT_REVIEW_SAVE_RESET})
        }
        dispatch(detailsProduct(props.match.params.id));
        return () => {
            //
        }
    }, [productSaveSucces])

    const submitHandler = (e) => {
        e.preventDefault();
        // dispatch actions to save usercomments
        dispatch(saveProductReview(props.match.params.id, {
            name: userInfo.name,
            rating: rating,
            comment: comment
        } ))
    }



    console.log(product);
    //console.log(JSON.stringify(props.match.params.id))
    console.log(props.match.params.id)
   // console.log(product.reviews)


    const handleAddToCart = () => {
        // method to redirect to another url
        props.history.push("/cart/" + props.match.params.id + "?qty=" + qty)
    }






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
                <Link to="#reviews" className={styles.ratingRedirect}>
                    <Rating value={product.rating} text={product.numReviews + ' reviews'}/>
                </Link>
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
                    <div className={styles.statusWrap}>
                        <div className={styles.stock}>Status:{' '} {product.stock > 0 ? `${product.stock} In Stock` : "Unavailable"}</div>
                        <div className={styles.category}>Categories: 
                                    <Link to="/" className={styles.cStyle}>Ducks</Link>
                        </div>

                    </div>


            </div> 
        </div>

</div> 

<div className={styles.lineTitle}>
        <div className={styles.divLine}></div>
                {/* <div className={styles.title}>
                     NEW & SPECIALS
                </div> */}
        <div className={styles.divLine}></div>
 </div> 

 <div className={styles.reviewContainer}>
     <h2>Reviews</h2>
    {!product.reviews.length && <div> There is no review</div>}
    <ul className={styles.review} id="reviews">
       {product.reviews.map((review) => (
           <li key={review._id}>
               <div>{review.name}</div>
               <div>
                   <Rating value={review.rating}></Rating>
                </div>
                <div>{review.createdAt.substring(0, 10)}</div>
                <div>{review.comment}</div>
           </li>
       ))}
       <li>
           <h3>Write a customer review</h3>
           {userInfo ? (
           <form onSubmit={submitHandler}>
               <ul className={styles.formContainer}>
                   <li>
                     <label htmlFor="rating">
                      Rating
                     </label>
                     <select name="rating" id="rating" value={rating}
                     onChange={(e) => setRating(e.target.value)}>
                         <option value="1">1- Poor</option>
                         <option value="2">2- Fair</option>
                         <option value="3">3- Good</option>
                         <option value="4">4- Very Good</option>
                         <option value="5">5- Excellent</option>
                     </select>
                   </li>
                   <li>
                       <label htmlFor="comment">Comment</label>
                       <textarea name="comment" value={comment} onChange={(e) => setComment(e.target.value)}></textarea>
                   </li>
                   <li>
                       <button type="submit" className={styles.buttonPrimary}>Submit</button>
                   </li>
               </ul>
           </form> 
           )  : (
           <div>Please <Link to="/signin">Sign-in</Link> to write a review</div>
           )}
       </li>
    </ul>
 </div>

<Footer/>
</div>
      
    )
}

export default Details;