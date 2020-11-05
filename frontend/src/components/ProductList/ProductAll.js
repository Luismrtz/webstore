import React, { useContext, useState, useEffect} from 'react';
import styles from './ProductList.module.scss';
import Pagination from '../Pagination/Pagination';
import ProductItem from '../ProductItem/ProductItem';
import {ReactComponent as Grid} from '../assets/grid.svg';
import {ReactComponent as List} from '../assets/list.svg';
import Loading from '../spinner/Loading';
import ErrorMsg from '../ErrorMsg/ErrorMsg';
import cx from 'classnames';
import Footer from '../Footer/Footer';

import { useSelector, useDispatch } from 'react-redux';
import { listProducts} from '../../actions/productActions';
const ProductAll = () => {

const pList = useSelector(state => state.pList);
const { products, loading, error } = pList;
const dispatch = useDispatch();



const [filter, setFilter] = useState(null);
const [isToggled, setToggled] = useState(true);
const [currentPage, setCurrentPage] = useState(1);
const [postsPerPage, setPostsPerPage] = useState(4);
//temp borderLine fix
const [borderNew, setBorderNew] = useState(true);
const [borderSpecial, setBorderSpecial] = useState(false);
const [borderAll, setBorderAll] = useState(false);
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

let defNew = products.filter(e => {
    return (
     e.newItem === true 
     //|| e.sale === true
     )
 })
 

const showNew = () => {
    setFilter(products);
    setFilter(defNew);
    setCurrentPage(1);
    
    setBorderNew(true);
    setBorderSpecial(false);
    setBorderAll(false);
}

const showSpecials = () => {
  //  setFilter(products);
    let E = products.filter(e => {
        return (
         e.sale === true 
         //|| e.sale === true
         )
     })
    setFilter(E);
    setCurrentPage(1);

   setBorderNew(false);
    setBorderSpecial(true);
    setBorderAll(false);
}

const showAll = () => {
    setFilter(products);
    ten(); //! quick fix to reset item entries
    setCurrentPage(1);
    setBorderNew(false);
    setBorderSpecial(false);
    setBorderAll(true);
}

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
    const currentPosts = (filter === null ? (defNew && defNew) : (filter && filter)).slice(indexOfFirstPost, indexOfLastPost); 

    const newCurP = [...currentPosts].sort((a,b) => {

       return a.title.localeCompare(b.title)
    })

    const onePage = Math.ceil(((filter === null ? (defNew) : (filter)).length) / postsPerPage);

    //todo  change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber)
    

    return loading ? <div><Loading/></div> :
    error || !products ? <ErrorMsg variant="danger">{error}</ErrorMsg> :
    (

      <div className={styles.mainContainer}>

          <div className={styles.titleContainer}>

                <h1 className={cx(styles.title, styles.center)}>SHOP</h1>

    
            </div>

            <div className={styles.typeFilter}>
                <button className={borderNew  ?  cx(styles.typePerPage, styles.borderLine) : styles.typePerPage }  onClick={() => showNew()}>NEW</button>
                <button className={borderSpecial ?  cx(styles.typePerPage, styles.borderLine) : styles.typePerPage }  onClick={() => showSpecials()}>SALES</button>
                <button className={borderAll ? cx(styles.typePerPage, styles.borderLine) : styles.typePerPage }  onClick={() => showAll()}>ALL</button>
          
            </div>
                
                
               <div className={(isToggled === true ? styles.itemsContainer : styles.nope)}> 
              
            
              <div className={styles.flex}>
                    <div className={styles.numPerPageGrid}>
                      {onePage === 1 ? <div className={styles.textPerPage}>Showing all {(filter === null ? (defNew) : (filter)).length} results</div> 
                                :
                        <div className={styles.textPerPage}>Showing {indexOfFirstPost + 1}-{indexOfFirstPost + currentPosts.length} of {(filter === null ? (defNew) : (filter)).length} results</div>
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
                            
                        })}
                    </div>

                    <nav className={styles.navPagination}>
                         <Pagination  postsPerPage={postsPerPage} totalPosts={ (filter === null ? (defNew) : (filter)).length} paginate={paginate}/>
                    </nav>
                    

                        
              </div>
  
          <Footer/>
      </div>
    )
}

export default ProductAll;