import React, { useContext, useState, useEffect} from 'react';

import styles from './MainPage.module.scss';
//import Pagination from '../Pagination/Pagination';
//import ProductItem from '../ProductItem/ProductItem';
// import {ReactComponent as Grid} from '../assets/grid.svg';
// import {ReactComponent as List} from '../assets/list.svg';
import Title from '../Title/Title';
//import {products} from '../api/data';
//import {ProductContext} from '../context/context';
import Banner from '../Banner/Banner';
import MainSales from '../mainPageSales/MainSales';
//import Pickles from '../api/Pickles'

//import {LoadContext} from '../context/LoadContext';
import { useSelector, useDispatch } from 'react-redux';
import { bannerProduct} from '../../actions/bannerActions';
import { listProducts} from '../../actions/productActions';



const ProductList = () => {



//const [products, setProducts] = useState(products);  NOT NEEDED HERE
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

// console.log(poop)
//const [isToggled, setToggled] = useState(true);


                
// const [storeP, setP] = useState([]);
//     useEffect(() => {
//         fetch("/api/products")
//         .then(res => res.json())
//         .then(data => setP(data))
//     },[])
    
    
//     console.log(storeP)
    
console.log(banners);
console.log(products)
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
//const [currentPage, setCurrentPage] = useState(1);
//const [postsPerPage] = useState(10);

//todo delete these later
// console.log(products);
// console.log(detailProduct);

 //   const indexOfLastPost = currentPage * postsPerPage;
//   const indexOfFirstPost = indexOfLastPost - postsPerPage;
//    const currentPosts = products && products.slice(indexOfFirstPost, indexOfLastPost); 
//todo  change page
 //   const paginate = (pageNumber) => setCurrentPage(pageNumber)
    

    return loading ? <div>Loading...</div> :
    error || !banners ? <div>{error}</div> :
    (

      <React.Fragment>



          
          {/* <div className={styles.page}> */}
          <Banner banners={banners}/>

          <div className={styles.poop}>
                        {products && products.map(product => {
                            if (product.mainPage === true) {
                            return (
                                <MainSales  key={product._id} product={product} />
                                ) 
                            }
                        })}
          </div>
                
              
        
             
          {/* </div> */}
          {/* <Pickles /> */}
      </React.Fragment>
    )
}

export default ProductList;