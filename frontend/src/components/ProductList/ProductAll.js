import React, { useContext, useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import styles from './ProductList.module.scss';
import Pagination from '../Pagination/Pagination';
import ProductItem from '../ProductItem/ProductItem';
import {ReactComponent as Grid} from '../assets/grid.svg';
import {ReactComponent as List} from '../assets/list.svg';
import cx from 'classnames';
import Title from '../Title/Title';
//import {products} from '../api/data';
//import {ProductContext} from '../context/context';
//import Banner from '../Banner/Banner';
//import Pickles from '../api/Pickles'

//import {LoadContext} from '../context/LoadContext';
import { useSelector, useDispatch } from 'react-redux';
import { listProducts, bannerProduct} from '../../actions/productActions';
const ProductAll = () => {



//const [products, setProducts] = useState(products);  NOT NEEDED HERE
//*let value = useContext(ProductContext);  every products had value.products/currentPosts, originally. But can just destructure
// let {products, isGlobalSpinnerOn} = useContext(ProductContext);

const pList = useSelector(state => state.pList);
//const bList = useSelector(state => state.bList);
const { products, loading, error } = pList;
//const { banners} = bList;
const dispatch = useDispatch();

useEffect(() => {
    dispatch(listProducts());
  //  dispatch(bannerProduct());
    return () => {
       //
    }
}, [])



//const isGlobalSpinnerOn = useContext(LoadContext);

// console.log(poop)
const [isToggled, setToggled] = useState(true);


                
// const [storeP, setP] = useState([]);
//     useEffect(() => {
//         fetch("/api/products")
//         .then(res => res.json())
//         .then(data => setP(data))
//     },[])
    
    
//     console.log(storeP)
    
console.log(products);
//console.log(products)
    
//console.log(products && products.length)




// const toggleTrue = () => setToggled(true);
// const toggleFalse = () => setToggled(false);

   // console.log(products) NOT NEEDED
    // console.log(value)
    // console.log(value.products)
//todo pagination start | INCLUDE LEFT SIDE FILTERS AND ITEM COUNT TRACKER | FIX 2 buttons
// const [posts, setPosts] = useState([]);
// const [loading, setLoading] = useState(false);
const [currentPage, setCurrentPage] = useState(1);
const [postsPerPage] = useState(4);

//todo delete these later
// console.log(products);
// console.log(detailProduct);

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = products && products.slice(indexOfFirstPost, indexOfLastPost); 

    const newCurP = [...currentPosts].sort((a,b) => {
        // if(a.title.toLowerCase() < b.title.toLowerCase()) return -1;
        // if(a.title.toLowerCase() > b.title.toLowerCase()) return 1;
        // return 0;
       return a.title.localeCompare(b.title)
    })

    //todo  change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber)
    

    console.log(currentPosts)
    console.log(newCurP)

    return loading ? <div>Loading...</div> :
    error || !products ? <div>{error}</div> :
    (

      <React.Fragment>



          
          {/* <div className={styles.page}> */}
          {/* <Banner banners={banners}/> */}
          <li><Link to="/">back to home</Link></li>

          <div className={styles.titleContainer}>

                <h1 className={cx(styles.title, styles.center)}>SHOP</h1>
                <h2 className={cx(styles.subTitle, styles.center)}>
                <Link to="/" className={styles.cStyle}>HOME</Link>&nbsp;/&nbsp; 
                <Link to="/shop" className={styles.cStyle}>SHOP</Link>&nbsp; 
                {/* if (product.type === 2) { */}
                   </h2>
    
            </div>
          
                
               <div className={(isToggled === true ? styles.container : styles.nope)}> {/* THIS IS JUST FOR COLOR LUL  */}
              {/* <div className={"styles." + (isToggled === true ? 'container' : 'nope')}>  */}
              
            
              <div className={styles.flex}>
                <div className={styles.text}>Showing {indexOfFirstPost + 1}-{indexOfFirstPost + currentPosts.length} out of {products.length} items</div>

                <div className={styles.icons}>
                    <div onClick={() => setToggled(true)}><Grid alt="grid" className={styles.svg1}/></div>
                        {/* MIT License*/}
                    <div onClick={() => setToggled(false)}><List alt="list" className={styles.svg2}/></div>
                </div>

              </div>
             

                    <div className={(isToggled === true ? styles.grid : styles.gridFlip)}>
                        {newCurP && newCurP.map(product => {
                           
                            return (
                                <ProductItem isToggled={isToggled} key={product._id} product={product} />
                                ) 
                            
                        })}
                    </div>

                    <nav className={styles.navPagination}>
                         <Pagination postsPerPage={postsPerPage} totalPosts={ products.length} paginate={paginate}/>
                    </nav>
                    
                    <div className={styles.footerQuestionmark}></div>
                        
              </div>
             
          {/* </div> */}
          {/* <Pickles /> */}
      </React.Fragment>
    )
}

export default ProductAll;