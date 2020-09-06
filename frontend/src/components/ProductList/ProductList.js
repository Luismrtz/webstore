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
const ProductList = () => {



//const [products, setProducts] = useState(products);  NOT NEEDED HERE
//*let value = useContext(ProductContext);  every products had value.products/currentPosts, originally. But can just destructure
// let {products, isGlobalSpinnerOn} = useContext(ProductContext);

const pList = useSelector(state => state.pList);
//const bList = useSelector(state => state.bList);
const { products, loading, error } = pList;
//const { banners} = bList;
const dispatch = useDispatch();

//!scrap it : start
 //const filtery = [...products];
 const [filter, setFilter] = useState(null);
 //!scrap it : end

 const [currentPage, setCurrentPage] = useState(1);
const [postsPerPage, setPostsPerPage] = useState(10);
useEffect(() => {
    dispatch(listProducts());
  //  dispatch(bannerProduct());
 
    return () => {
       //
    }
}, [])


//const isGlobalSpinnerOn = useContext(LoadContext);


const [isToggled, setToggled] = useState(true);



//!scrap it: start
const showSale = () => {
    let salesS = products.filter(e => e.sale === true)
    setFilter(salesS);
    setCurrentPage(1);
}

const showDucks = () => {
    setFilter(products);
    let type1 = products.filter(e => e.type === 1)
    setFilter(type1)
    setCurrentPage(1);
}

const showAcc = () => {
    setFilter(products);
    let type2 = products.filter(e => e.type === 2)
    setFilter(type2);
    setCurrentPage(1);
}
const trending = () => {
    setFilter(products);
    let trendD = products.filter(e => {
       return (
        e.newItem === true ||
        e.sale === true
        )
    })
    setFilter(trendD);
    setCurrentPage(1);
    console.log(trendD)
}



const showAll = () => {
    setFilter(products);
    setCurrentPage(1);
}

const five = () => {
    setPostsPerPage(5);
    setCurrentPage(1);
}

const ten = () => {
    setPostsPerPage(10);
    setCurrentPage(1);
}

const fifteen = () => {
    setPostsPerPage(15);
    setCurrentPage(1);
}

    //!scrap it : end            
// const [storeP, setP] = useState([]);
//     useEffect(() => {
//         fetch("/api/products")
//         .then(res => res.json())
//         .then(data => setP(data))
//     },[])
    
    
//     console.log(storeP)
    

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


//todo delete these later
 console.log(products);
//console.log(filtery);

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = (filter === null ? (products && products) : (filter && filter)).slice(indexOfFirstPost, indexOfLastPost); 

    const newCurP = [...currentPosts].sort((a,b) => {
        // if(a.title.toLowerCase() < b.title.toLowerCase()) return -1;
        // if(a.title.toLowerCase() > b.title.toLowerCase()) return 1;
        // return 0;
       return a.title.localeCompare(b.title)
    })

    //todo  change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber)
    


    return loading ? <div>Loading...</div> :
    error || !products ? <div>{error}</div> :
    (

      <React.Fragment>

        
        <button onClick={() => showAll()}>ALL</button>
        <button onClick={() => showSale()}>SALES</button>
        <button onClick={() => showDucks()}>ducks</button>
        <button onClick={() => showAcc()}>last try</button>
        <button onClick={() => trending()}>Trending</button>
          
          {/* <div className={styles.page}> */}
          {/* <Banner banners={banners}/> */}
          <li><Link to="/">back to home</Link></li>

          <div className={styles.titleContainer}>

            <h1 className={cx(styles.title, styles.center)}>DUCKES</h1>
            <h2 className={cx(styles.subTitle, styles.center)}>
            <Link to="/" className={styles.cStyle}>HOME</Link>&nbsp;/&nbsp; 
            <Link to="/shop" className={styles.cStyle}>SHOP</Link>&nbsp;/&nbsp; 
            {/* if (product.type === 2) { */}
                <Link to="/" className={styles.cStyle}>
                    </Link>&nbsp;DUCKES</h2>

    </div>

          
                
               <div className={(isToggled === true ? styles.container : styles.nope)}> {/* THIS IS JUST FOR COLOR LUL  */}
              {/* <div className={"styles." + (isToggled === true ? 'container' : 'nope')}>  */}
              
            
              <div className={styles.flex}>
                <div className={styles.text}>Showing {indexOfFirstPost + 1}-{indexOfFirstPost + currentPosts.length} out of {(filter === null ? (products) : (filter)).length} items</div>
               
                <button onClick={() => five()}>5</button>
                <button onClick={() => ten()}>10</button>
                <button onClick={() => fifteen()}>15</button>
                <div className={styles.icons}>
                    <div onClick={() => setToggled(true)}><Grid alt="grid" className={styles.svg1}/></div>
                        {/* MIT License*/}
                    <div onClick={() => setToggled(false)}><List alt="list" className={styles.svg2}/></div>
                </div>

              </div>
             

                    <div className={(isToggled === true ? styles.grid : styles.gridFlip)}>
                        {newCurP && newCurP.map(product => {
                            // if (product.type === 1) {
                            return (
                                <ProductItem isToggled={isToggled} key={product._id} product={product} />
                                 ) 
                            // }
                        })}
                    </div>

                    <nav className={styles.navPagination}>
                         <Pagination postsPerPage={postsPerPage} totalPosts={ (filter === null ? (products) : (filter)).length} paginate={paginate}/>
                         {/* totalPosts={ (f === null ? (products && products) : (f && f)).length} */}
                    </nav>
                    
                    <div className={styles.footerQuestionmark}></div>
                        
              </div>
             
          {/* </div> */}
          {/* <Pickles /> */}
      </React.Fragment>
    )
}

export default ProductList;