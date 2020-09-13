import React, { useState } from "react";
import ReactDOM from "react-dom";
import { Link } from 'react-router-dom';
import Dropdown from "./Dropdown4";
import * as FaIcons from 'react-icons/fa';
//import * as AiIcons from 'react-icons/ai';
import * as MdIcon from 'react-icons/md';
import styles from "./Navbar.module.scss";
import cx from 'classnames';

function Navbar4() {
 const [navbar, setNavbar] = useState(false);


  const changeBackground = () => {
    if (window.scrollY >= 10) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  }

  window.addEventListener('scroll', changeBackground)

 //! innerwidth vs hover


  // const [dropdown, setDropdown] = useState(false);
  

  // const onMouseEnter = () => {
  //   if (window.innerWidth < 960) {
  //     setDropdown(false);
  //   } else {
  //     setDropdown(true);
  //   }
  // };

  // const onMouseLeave = () => {
  //   if (window.innerWidth < 960) {
  //     setDropdown(false);
  //   } else {
  //     setDropdown(false);
  //   }
  // };
//! innerwidth end

  return (

    <nav className={styles.mainNavContainer}>
      
        <div className={navbar ? cx(styles.secNavContainer, styles.scrollCss) : cx(styles.secNavContainer)}>
            <div className={styles.navStart}>
            <ul className={cx(styles.navTitle, styles.navHide)}>
            <Link to={'/'} className={styles.titleColor}> SYMBOLS </Link>
            </ul>




            <ul className={styles.navLinksContainer}>
            <li className={styles.navLinkItem }>
              <Link to={'/'} className={cx(styles.iconButton, styles.underline)}>
                  Home
              </Link>
            </li>


                    <NavHoverLinks >
                     
                    </NavHoverLinks>
                
{/* //! innerwidth vs hover end */}
{/* 


            <ul
            className='fullScreenHover'
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
          >
            <Link
              to='/services'
              className='icon-button'
              
            >
              Services <i className='fas fa-caret-down' />
            </Link>

           {dropdown === true && <ul className="dropdown-menu">
            <li>
              <Link
                className="icon-button"
                to="/"
                
              >
                ONE
              </Link>
            </li>
            <li>
              <Link
                className="icon-button"
                to="/"
                
              >
                TWO
              </Link>
            </li>
            <li>
              <Link
                className="icon-button"
                to="/"
                
              >
                THREE
              </Link>
            </li>
            <li>
              <Link
                className="icon-button"
                to="/"
                
              >
                FOUR
              </Link>
            </li>

                  </ul> }

          </ul> 
          */}

{/* //! innerwidth vs hover end */}


          <li className={styles.navLinkItem}>
            <Link to={'/'} className={cx(styles.iconButton, styles.underline)}>
                Profile
            </Link>
          </li>


          <li className={styles.navLinkItem}>
            <Link to={'/cart'} className={cx(styles.iconButton, styles.borderbotNone)}>
            <FaIcons.FaShoppingCart/>
            </Link>
        </li>


        <li className={styles.mobileNav}>
      <Dropdown 
                // placeholder="Select Vegetable"
                // value={vegetagle}
                // onChange={v => setVegetable(v)}
                // options={["Tomato", "Cucumber", "Potato"]}
            />
        </li>
        

        {/* <FaIcons.FaBars style={{color:'white', width: '15px', height: '15px'}} /> */}


      {/* <NavItemFull className="yup"  icon={'profile'} /> */}
      {/* <NavItemFull className="yup" icon={'cart'} /> */}

 
      
      </ul>





     
            {/* <Dropdown
                placeholder="Select Fruit"
                value={fruit}
                onChange={v => setFruit(v)}
                options={["Apple", "Banana", "Orange", "Mango"]}
            /> */}
            </div>
        </div>
    </nav>
  );
}


//! 3.a) baby function: links to 1)(and thus inside 2))
function NavHoverLinks() {

    return (
      <ul className={styles.fullScreenHover}>
        <li style={{display:'flex', alignItems:'center'}}>
           <div className={cx(styles.iconButton, styles.underline)}> Store </div>
            <div>
              <MdIcon.MdKeyboardArrowDown className={styles.borderbotNone} style={{color:'#aaa', width: '15px', height: '15px', marginBottom: '-.3rem', marginLeft:'-1.4rem'}}/>
              </div> 

        </li>
        
        <div className={styles.onHoverMenu}>
        <div className={styles.onHoverBlock}>
              <span className={styles.onHoverArrow}></span>
          </div>
        <Link to={'/shop/products'} className={styles.iconButtonHov}>
            Products
        </Link>
        <Link to={"/shop/accessories"} className={styles.iconButtonHov}>
            Accessories
        </Link>
        <Link to={"/shop"} className={styles.iconButtonHov}>
            sales
        </Link>
        </div>
        
  
       
      </ul>
    );
  }

export default Navbar4
