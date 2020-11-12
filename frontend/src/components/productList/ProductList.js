import React, { useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import styles from './ProductList.module.scss';
import Pagination from '../pagination/Pagination';
import ProductItem from '../productItem/ProductItem';
import {ReactComponent as Grid} from '../assets/grid.svg';
import {ReactComponent as List} from '../assets/list.svg';
import Loading from '../spinner/Loading'
import ErrorMsg from '../errorMsg/ErrorMsg';
import cx from 'classnames';

import { useSelector, useDispatch } from 'react-redux';
import { listProducts} from '../../actions/productActions';
import Footer from '../footer/Footer';
const ProductList = () => {


const pList = useSelector(state => state.pList);
const { products, loading, error } = pList;
const dispatch = useDispatch();

 const [filter] = useState(null);


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
}, [dispatch])



const [isToggled, setToggled] = useState(true);




let access = products.filter(e => {
    return (
     e.type === 2 
     //|| e.sale === true
     )
 })

//!scrap it: start


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
    


    return loading ? <div><Loading/></div> :
    error || !products ? <ErrorMsg variant="danger">{error}</ErrorMsg> :
    (

        <div className={styles.mainContainer}>


          <div className={styles.titleContainer}>

            <h1 className={cx(styles.title, styles.center)}>JARS</h1>
            <h2 className={cx(styles.subTitle, styles.center)}>
            <Link to="/" className={styles.cStyle}>HOME</Link>&nbsp;/&nbsp; 
            <Link to="/shop" className={styles.cStyle}>SHOP</Link>&nbsp;/&nbsp; 
            {/* if (product.type === 2) { */}
                <Link to="/" className={styles.cStyle}>
                    </Link>&nbsp;JARS</h2>

    </div>

          
                
               <div className={(isToggled === true ? styles.itemsContainer : styles.nope)}> 
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
            
                    <div onClick={() => setToggled(false)}><List alt="list" className={styles.svg2}/></div>
                </div>

              </div>
             

                    <div className={(isToggled === true ? styles.grid : styles.gridFlip)}>
                        {newCurP && newCurP.map(product => {
                            return (
                                <ProductItem isToggled={isToggled} key={product._id} product={product} />
                                 ) 
                            // }
                        })}
                    </div>

                    <nav className={styles.navPagination}>
                         <Pagination postsPerPage={postsPerPage} totalPosts={ (filter === null ? (access) : (filter)).length} paginate={paginate}/>

                    </nav>
                    

                        
              </div>
          <Footer/>
      </div>
    )
}

export default ProductList;