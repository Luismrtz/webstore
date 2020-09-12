import React, { useEffect, useState, useRef } from "react";
import { Link } from 'react-router-dom';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import cx from 'classnames';
import styles from'./Navbar.module.scss';



const Dropdown = () => {
  const node = useRef();

  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);


  const handleClick = e => {
    if (node.current.contains(e.target)) {
      // inside click
      return;
    }
    // outside click
    setOpen(false);
  };


  useEffect(() => {
    document.addEventListener("mousedown", handleClick);

    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);

//? stop body scroll if open
  useEffect(() => {
    open ? (document.body.style.overflow = 'hidden')
    : (document.body.style.overflow = '')
 }, [open ]);



  return (
 
 <div ref={node} className={styles.dropdownContainerAll}>
        <div className={open === false ? cx(styles.superNav, styles.hide) : styles.superNav} onClick={e => setOpen(!open) }></div>
        <div className={styles.flexxy}>
            <div className={styles.navTitle}>
               <Link to={'/'} className={styles.titleColor}> SYMBOLS </Link>
            </div>

      <ul className={styles.cartItem}>
      
      
      
          <li>
            <Link to={'/cart'} className={cx(styles.mobileIcon, styles.borderbotNone)} >
            <FaIcons.FaUser/>
            </Link>
        </li>
            <li>
            <Link to={'/cart'} className={cx(styles.mobileIcon, styles.borderbotNone)} >
            <FaIcons.FaShoppingCart/>
            </Link>
        </li>
            <li className={styles.hamburgerDiv} onClick={e => setOpen(!open) }>
                  <FaIcons.FaBars className={styles.hamburgerToggle} />
          </li>
      </ul>

      </div>
      {/* {open && ( */}
        <div className={open === false ? cx(styles.dropdownMenu, styles.inactive) :  cx(styles.dropdownMenu, styles.active)}>
          {/* {options.map(opt => ( */}


            <div className={styles.exitDiv} >
              <AiIcons.AiOutlineClose onClick={e => setOpen(!open) } className={styles.exitToggle} />
            </div>
          <div className={styles.wrappTest}>
   

          <div>
          <Link to={"/"} onClick={e =>  setOpen(!open)}>
           <button className={cx(styles.dropdownMenuItem, styles.bordertopNone)} >
              {/* {opt} */}
              Home
              {/* <div className="right">+</div> */}
            </button>
            </Link>
          </div>

          <div>
            
            <button className={styles.dropdownMenuItem} onClick={e =>  setOpen2(!open2)}>
              {/* {opt} */}
              Store
              <span className={styles.collapsePlus}>
                 <div className={styles.signSize}> 
                 {open2 === false ? "+" : "-"} 
                 </div>
              </span>
            </button>
            <ul className={open2 === false ? cx(styles.dropdownMenuInner, styles.hide) : cx(styles.dropdownMenuInner, styles.show)}>
            <Link to={"/"} onClick={e =>  setOpen(!open)}>
              <li className={styles.dropdownMenuItemSec} >Products</li>
            </Link>
            <Link to={"/"} onClick={e =>  setOpen(!open)}>
                <li className={styles.dropdownMenuItemSec}>Accessories</li>
            </Link>
            <Link to={"/"} onClick={e =>  setOpen(!open)}>
                <li className={styles.dropdownMenuItemSec}>Sales</li>
            </Link>
            </ul> 
          </div>


          <div>
                <Link to={"/"} onClick={e =>  setOpen(!open)}>
            <button className={cx(styles.dropdownMenuItem, styles.borderlineBotm)} >
                Profile
              </button>
                </Link>
          </div>
</div>




          {/* ))} */}
        </div>
      {/* )} */}
    
      </div>
    
   
  );
};

export default Dropdown;
