import React, { useContext, useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import styles from './ProductList.module.scss';
import Pagination from '../Pagination/Pagination';
import ProductItem from '../ProductItem/ProductItem';
import {ReactComponent as Grid} from '../assets/grid.svg';
import {ReactComponent as List} from '../assets/list.svg';
import cx from 'classnames';
import Title from '../Title/Title';
import Footer from '../Footer/Footer';
//import {products} from '../api/data';
//import {ProductContext} from '../context/context';
//import Banner from '../Banner/Banner';
//import Pickles from '../api/Pickles'

//import {LoadContext} from '../context/LoadContext';
import { useSelector, useDispatch } from 'react-redux';
import { listProducts, bannerProduct} from '../../actions/productActions';
const ProductList2 = () => {



//const [products, setProducts] = useState(products);  NOT NEEDED HERE
//*let value = useContext(ProductContext);  every products had value.products/currentPosts, originally. But can just destructure
// let {products, isGlobalSpinnerOn} = useContext(ProductContext);

const pList = useSelector(state => state.pList);
//const bList = useSelector(state => state.bList);
const { products, loading, error } = pList;
//const { banners} = bList;
const dispatch = useDispatch();

const newFilter = [...products]


// if (product.type === 2)
//const poop = newFilter.splice(e => e.type === 1)
//const [filtery, setFilter] = useState(poop)
const [filter, setFilter] = useState(null);
const [isToggled, setToggled] = useState(true);
const [currentPage, setCurrentPage] = useState(1);
const [postsPerPage, setPostsPerPage] = useState(10);


// temp numPage fix
const [fivePage, setFivePage] = useState(false);
const [tenPage, setTenPage] = useState(true);
const [fifPage, setFifPage] = useState(false);

    

useEffect(() => {
    dispatch(listProducts());
  //  dispatch(bannerProduct());
    return () => {
       //
    }
}, [])


let access = products.filter(e => {
    return (
     e.type === 1 
     //|| e.sale === true
     )
 })


const five = () => {
    setPostsPerPage(5);
    setCurrentPage(1);
    setFivePage(true);
    setTenPage(false);
    setFifPage(false);
}

const ten = () => {
    setPostsPerPage(10);
    setCurrentPage(1);
    setFivePage(false);
    setTenPage(true);
    setFifPage(false);
}

const fifteen = () => {
    setPostsPerPage(15);
    setCurrentPage(1);
    setFivePage(false);
    setTenPage(false);
    setFifPage(true);
}


//const isGlobalSpinnerOn = useContext(LoadContext);

// console.log(poop)

                
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


//todo delete these later
// console.log(products);
// console.log(detailProduct);

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = (filter === null ? (access && access) : (filter && filter)).slice(indexOfFirstPost, indexOfLastPost); 

    const newCurP = [...currentPosts].sort((a,b) => {
        // if(a.title.toLowerCase() < b.title.toLowerCase()) return -1;
        // if(a.title.toLowerCase() > b.title.toLowerCase()) return 1;
        // return 0;
       return a.title.localeCompare(b.title)
    })

    const onePage = Math.ceil(((filter === null ? (access) : (filter)).length) / postsPerPage);


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
          {/* <li><Link to="/">back to home</Link></li> */}

          <div className={styles.titleContainer}>

                <h1 className={cx(styles.title, styles.center)}>ACCESSORIES</h1>
                <h2 className={cx(styles.subTitle, styles.center)}>
                <Link to="/" className={styles.cStyle}>HOME</Link>&nbsp;/&nbsp; 
                <Link to="/shop" className={styles.cStyle}>SHOP</Link>&nbsp;/&nbsp; 
                {/* if (product.type === 2) { */}
                    <Link to="/" className={styles.cStyle}>
                        </Link>&nbsp;ACCESSORIES</h2>

            </div>
            
                
               <div className={(isToggled === true ? styles.container : styles.nope)}> {/* THIS IS JUST FOR COLOR LUL  */}
              {/* <div className={"styles." + (isToggled === true ? 'container' : 'nope')}>  */}
              
            
              <div className={styles.flex}>
                    <div className={styles.numPerPageGrid}>

                        
                       
                         {onePage === 1 ? <div className={styles.textPerPage}>Showing all {(filter === null ? (access) : (filter)).length} results</div> 
                                :
                        <div className={styles.textPerPage}>Showing {indexOfFirstPost + 1}-{indexOfFirstPost + currentPosts.length} of {(filter === null ? (access) : (filter)).length} results</div>
                        }


                         <div className={styles.numPerPageWrap}>
                            <div className={styles.showBtn}>show</div>
                            <button className={fivePage ? cx(styles.numPerPage, styles.borderLine) : styles.numPerPage} onClick={() => five()}>5</button>
                            <button className={tenPage ?cx(styles.numPerPage, styles.borderLine) : styles.numPerPage} onClick={() => ten()}>10</button>
                            <button className={fifPage ? cx(styles.numPerPage, styles.borderLine) : styles.numPerPage} onClick={() => fifteen()}>15</button>    
                        </div>   

                    </div>

                <div className={styles.icons}>
                    <div onClick={() => setToggled(true)}><Grid alt="grid" className={styles.svg1}/></div>
                        {/* MIT License*/}
                    <div onClick={() => setToggled(false)}><List alt="list" className={styles.svg2}/></div>
                </div>

              </div>
             

                    <div className={(isToggled === true ? styles.grid : styles.gridFlip)}>
                        {newCurP && newCurP.map(product => {
                            if (product.type === 1) {
                            return (
                                <ProductItem isToggled={isToggled} key={product._id} product={product} />
                                ) 
                            }
                        })}
                    </div>

                    <nav className={styles.navPagination}>
                         <Pagination postsPerPage={postsPerPage} totalPosts={ (filter === null ? (access) : (filter)).length} paginate={paginate}/>
                    </nav>

                        
              </div>
             
          {/* </div> */}
          {/* <Pickles /> */}
          <Footer/>
      </React.Fragment>
    )
}

export default ProductList2;
