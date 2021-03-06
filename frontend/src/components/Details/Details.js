import React, { useEffect, useState } from "react";
import styles from "./Details.module.scss";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Loading from '../spinner/Loading';
import ErrorMsg from '../ErrorMsg/ErrorMsg';
import cx from "classnames";
import Footer from "../Footer/Footer";
import Rating from "../Rating/Rating";
import {
  detailsProduct,
  saveProductReview,
} from "../../actions/productActions";
import { PRODUCT_REVIEW_SAVE_RESET } from "../../constants/productConstants";

//* Sync
//* if match,
const Details = (props) => {
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const pDetails = useSelector((state) => state.pDetails);
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const { product, loading, error } = pDetails;
  const productReviewSave = useSelector((state) => state.productReviewSave);
  const { success: productSaveSuccess } = productReviewSave;
  const dispatch = useDispatch();
  const productId = props.match.params.id;
  useEffect(() => {
    if (productSaveSuccess) {
      alert("Review submitted successfully.");
      setRating(0);
      setComment("");

      dispatch({ type: PRODUCT_REVIEW_SAVE_RESET });
    }
    dispatch(detailsProduct(productId));
    return () => {

    };
  }, [dispatch, productId, productSaveSuccess]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      saveProductReview(productId, {
        name: userInfo.name,
        rating: rating,
        comment: comment,
      })
    );
  };

  const handleAddToCart = () => {
    props.history.push(`/cart/${productId}?qty=${qty}`);
   // props.history.push("/cart/" + productId + "?qty=" + qty);
  };


  return loading ? (
    <div><Loading/></div>
  ) : error || !product ? (
    <ErrorMsg variant="danger">{error}</ErrorMsg>
  ) : (
    <div className={styles.container}>
      <div className={styles.widthContainer}>
      <div className={styles.titleContainer}>
        <h1 className={cx(styles.title, styles.center)}>{product.title}</h1>
        <h2 className={cx(styles.subTitle, styles.center)}>
          <Link to="/" className={styles.cStyle}>
            HOME
          </Link>
          &nbsp;/&nbsp;
          <Link to="/shop" className={styles.cStyle}>
            SHOP
          </Link>
          &nbsp;/&nbsp;
          <Link
            to={product.type === 1 ? "/shop/products" : "/shop/cups"}
            className={styles.cStyle}
          >
            {product.type === 1 ? "DUCKS" : "cups"}
          </Link>
          &nbsp;/&nbsp;{product.title}
        </h2>
      </div>

      <div className={styles.grid}>
        {/* grid 1 */}
        <div className={styles.tinyGrid}>
          <img
            className={styles.image1}
            src={"/" + (product ? product.img : "images/antique.jpg")}
            alt="duckens"
          ></img>
        </div>

        {/* grid 2 */}
        <div className={styles.imgOverlay}>
          <img
            className={styles.image}
            src={"/" + (product ? product.img : "images/antique.jpg")}
            alt="duckens"
          />
        </div>
        {/* grid 3 */}
        <div className={styles.contents}>
          <div className={styles.contDesc}>
            <h1 className={styles.title}>{product.title}</h1>
            <Link to="#reviews" className={styles.ratingRedirect}>
              <Rating
                value={product.rating}
                text={product.numReviews + " reviews"}
              />
            </Link>
            {product.sale === false ? (
               <h2 className={styles.price}>${(product.price).toFixed(2)}</h2>
            ) :
            (<div className={styles.discountWrapper}> 
              <h2 className={styles.price}>${(product.discount).toFixed(2)}</h2>
              <h2 className={styles.sale} >${product.price.toFixed(2)}</h2>
            </div>
            )}
            <h3 className={styles.descript}>{product.info}</h3>
          </div>

          <div className={styles.listIcons}>
            <div className={styles.wrap}>
              <div className={styles.qtext}>
                Qty:{" "}
                <select
                  className={styles.quantity}
                  value={qty}
                  onChange={(e) => {
                    setQty(e.target.value);
                  }}
                >
                  {[...Array(product.stock).keys()].map((x) => (
                    <option key={x + 1} value={x + 1}>
                      {x + 1}
                    </option>
                  ))}
                </select>
              </div>

              {/* if greater than 0, show this. else do not render */}
              {product.stock > 0 ? (
                <div onClick={handleAddToCart} className={styles.button2}>
                  Add to Cart
                </div>
              ) : (
                <button
                  onClick={handleAddToCart}
                  disabled
                  className={styles.button3}
                >
                  Out of Stock
                </button>
              )}

            </div>
            <div className={styles.statusWrap}>
              <div className={styles.stock}>
                Status:{" "}
                {product.stock > 0
                  ? `${product.stock} In Stock`
                  : "Unavailable"}
              </div>
              <div className={styles.category}>
                Categories:
                <Link to="/" className={styles.cStyle}>
                  Ducks
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
                {/* //!page divider */}
      <div className={styles.lineTitle}>
        <div className={styles.divLine}></div>
        <div className={styles.divLine}></div>
      </div>

      {/* //!start of reviews */}
      {/*//todo add a delete feature for review. If user/admin */}
      <div className={styles.reviewPageWrapper}>
     
        <h2 className={styles.reviewTitle}>Reviews</h2>
        <div className={styles.commentReviewContainer}>
          <div className={styles.subReviewContainer}>

        {!product.reviews.length && <div> There is no review</div>}
        <ul className={styles.review} id="reviews">
          {product.reviews.map((review) => (
            <li className={styles.reviewSingle} key={review._id}>
              <div>{review.name}</div>
              <div>
                <Rating value={review.rating}></Rating>
              </div>
              <div>{review.createdAt.substring(0, 10)}</div>
              <div>{review.comment}</div>
            </li>
          ))}
       </ul>
          </div>

         {/* //!customer comments */}
          <div className={styles.commentContainer}>
            <div className={styles.subContainer}>
            <h3>Write a customer review</h3>
            {userInfo ? (
              <form onSubmit={submitHandler}>
                <ul className={styles.formContainer}>
                  <li>
                    <div>Rating</div>
                    {/* <label htmlFor="rating"></label> */}
                    <select
                    className={styles.ratingWidth}
                      name="rating"
                      id="rating"
                      value={rating}
                      onChange={(e) => setRating(e.target.value)}
                    >
                      <option value="1">1- Poor</option>
                      <option value="2">2- Fair</option>
                      <option value="3">3- Good</option>
                      <option value="4">4- Very Good</option>
                      <option value="5">5- Excellent</option>
                    </select>
                  </li>
                  <li>
                    <div>Comment</div>
                    {/* <label htmlFor="comment"></label> */}
                    <textarea 
                      className={styles.commentWidth}
                      name="comment"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                    ></textarea>
                  </li>
                  <li>
                    <button type="submit" className={styles.buttonPrimary}>
                      Submit
                    </button>
                  </li>
                </ul>
              </form>
            ) : (
              <div className={styles.signIn}>
                Please <Link to="/signin">Sign-in</Link> to write a review
              </div>
            )}
            </div>
          </div>
          </div>
      </div>
  {/* //!end of reviews */}
  </div>
      <Footer />
      
    </div>
  );
};

export default Details;
