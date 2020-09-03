// import React, { useContext, useState, useEffect} from 'react';

// import styles from './ProductList.module.scss';
// import Pagination from '../Pagination/Pagination';
// import ProductItem from '../ProductItem/ProductItem';
// import {ReactComponent as Grid} from '../assets/grid.svg';
// import {ReactComponent as List} from '../assets/list.svg';
// import Title from '../Title/Title';
// import {ProductContext} from '../context/context';
// import Banner from '../Banner/Banner';
// import Pickles from '../api/Pickles'




//import {storeProducts} from '../api/data';
import {LoadContext} from '../context/LoadContext';
const ProductList = () => {



//const [products, setProducts] = useState(storeProducts);  NOT NEEDED HERE
//*let value = useContext(ProductContext);  every storeProducts had value.storeProducts/currentPosts, originally. But can just destructure
let {storeProducts, isGlobalSpinnerOn} = useContext(ProductContext);
//const isGlobalSpinnerOn = useContext(LoadContext);

// console.log(poop)
const [isToggled, setToggled] = useState(true);


                
// const [storeP, setP] = useState([]);
//     useEffect(() => {
//         fetch("/api/storeProducts")
//         .then(res => res.json())
//         .then(data => setP(data))
//     },[])
    
    
//     console.log(storeP)
    
    
console.log(storeProducts && storeProducts.length)




// const toggleTrue = () => setToggled(true);
// const toggleFalse = () => setToggled(false);

   // console.log(products) NOT NEEDED
    // console.log(value)
    // console.log(value.storeProducts)
//todo pagination start | INCLUDE LEFT SIDE FILTERS AND ITEM COUNT TRACKER | FIX 2 buttons
// const [posts, setPosts] = useState([]);
// const [loading, setLoading] = useState(false);
const [currentPage, setCurrentPage] = useState(1);
const [postsPerPage] = useState(10);

//todo delete these later
// console.log(storeProducts);
// console.log(detailProduct);

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = storeProducts && storeProducts.slice(indexOfFirstPost, indexOfLastPost); 
//todo  change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber)
    

    return isGlobalSpinnerOn ? <div>Loading...</div> :
    (

      <React.Fragment>



          
          {/* <div className={styles.page}> */}
          <Banner/>
                
               <div className={(isToggled === true ? styles.container : styles.nope)}> {/* THIS IS JUST FOR COLOR LUL  */}
              {/* <div className={"styles." + (isToggled === true ? 'container' : 'nope')}>  */}
              
            
              <div className={styles.flex}>
                <div className={styles.text}>Showing {indexOfFirstPost + 1}-{storeProducts && storeProducts.length} out of {storeProducts && storeProducts.length} items</div>

                <div className={styles.icons}>
                    <div onClick={() => setToggled(true)}><Grid alt="grid" className={styles.svg1}/></div>
                        {/* MIT License*/}
                    <div onClick={() => setToggled(false)}><List alt="list" className={styles.svg2}/></div>
                </div>

              </div>
             

                    <div className={(isToggled === true ? styles.grid : styles.gridFlip)}>
                        {currentPosts && currentPosts.map(product => {
                            return(
                                <ProductItem isToggled={isToggled} key={product.id} product={product} />
                                ) 
                        })}
                    </div>

                    <nav className={styles.navPagination}>
                         <Pagination postsPerPage={postsPerPage} totalPosts={storeProducts && storeProducts.length} paginate={paginate}/>
                    </nav>
                    
                    <div className={styles.footerQuestionmark}></div>
                        
              </div>
             
          {/* </div> */}
          {/* <Pickles /> */}
      </React.Fragment>
    )
}

export default ProductList;