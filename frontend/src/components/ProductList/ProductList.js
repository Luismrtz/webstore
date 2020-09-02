import React, { useContext, useState, useEffect} from 'react';

import styles from './ProductList.module.scss';
import Pagination from '../Pagination/Pagination';
import ProductItem from '../ProductItem/ProductItem';
import {ReactComponent as Grid} from '../assets/grid.svg';
import {ReactComponent as List} from '../assets/list.svg';
import Title from '../Title/Title';
//import {products.storeProducts} from '../api/data';
//import {ProductContext} from '../context/context';
import Banner from '../Banner/Banner';
//import Pickles from '../api/Pickles'

//import {LoadContext} from '../context/LoadContext';
import { useSelector, useDispatch } from 'react-redux';
import { listProducts } from '../../actions/productActions';
const ProductList = () => {



//const [products, setProducts] = useState(products.storeProducts);  NOT NEEDED HERE
//*let value = useContext(ProductContext);  every products.storeProducts had value.products.storeProducts/currentPosts, originally. But can just destructure
// let {products.storeProducts, isGlobalSpinnerOn} = useContext(ProductContext);

const pList = useSelector(state => state.pList);
const { products, loading, error } = pList;
const dispatch = useDispatch();

useEffect(() => {
    dispatch(listProducts());
    return () => {
       //
    }
}, [])



//const isGlobalSpinnerOn = useContext(LoadContext);

// console.log(poop)
const [isToggled, setToggled] = useState(true);


                
// const [storeP, setP] = useState([]);
//     useEffect(() => {
//         fetch("/api/products.storeProducts")
//         .then(res => res.json())
//         .then(data => setP(data))
//     },[])
    
    
//     console.log(storeP)
    
console.log(products);
    
//console.log(products.storeProducts && products.storeProducts.length)




// const toggleTrue = () => setToggled(true);
// const toggleFalse = () => setToggled(false);

   // console.log(products) NOT NEEDED
    // console.log(value)
    // console.log(value.products.storeProducts)
//todo pagination start | INCLUDE LEFT SIDE FILTERS AND ITEM COUNT TRACKER | FIX 2 buttons
// const [posts, setPosts] = useState([]);
// const [loading, setLoading] = useState(false);
const [currentPage, setCurrentPage] = useState(1);
const [postsPerPage] = useState(10);

//todo delete these later
// console.log(products.storeProducts);
// console.log(detailProduct);

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = products.storeProducts && products.storeProducts.slice(indexOfFirstPost, indexOfLastPost); 
//todo  change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber)
    

    return loading ? <div>Loading...</div> :
    error || !products.storeProducts ? <div>{error}</div> :
    (

      <React.Fragment>



          
          {/* <div className={styles.page}> */}
          <Banner products={products}/>
                
               <div className={(isToggled === true ? styles.container : styles.nope)}> {/* THIS IS JUST FOR COLOR LUL  */}
              {/* <div className={"styles." + (isToggled === true ? 'container' : 'nope')}>  */}
              
            
              <div className={styles.flex}>
                <div className={styles.text}>Showing {indexOfFirstPost + 1}-{products.storeProducts.length} out of {products.storeProducts.length} items</div>

                <div className={styles.icons}>
                    <div onClick={() => setToggled(true)}><Grid alt="grid" className={styles.svg1}/></div>
                        {/* MIT License*/}
                    <div onClick={() => setToggled(false)}><List alt="list" className={styles.svg2}/></div>
                </div>

              </div>
             

                    <div className={(isToggled === true ? styles.grid : styles.gridFlip)}>
                        {currentPosts && currentPosts.map(product => {
                            return(
                                <ProductItem isToggled={isToggled} key={product._id} product={product} />
                                ) 
                        })}
                    </div>

                    <nav className={styles.navPagination}>
                         <Pagination postsPerPage={postsPerPage} totalPosts={ products.storeProducts.length} paginate={paginate}/>
                    </nav>
                    
                    <div className={styles.footerQuestionmark}></div>
                        
              </div>
             
          {/* </div> */}
          {/* <Pickles /> */}
      </React.Fragment>
    )
}

export default ProductList;