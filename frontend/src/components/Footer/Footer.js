import React from "react";
import { Link } from 'react-router-dom';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import styles from "./Footer.module.scss";

function Footer() {
 

// rgba(222,215,226,.31)
  return (
    <React.Fragment>
        <div className={styles.container}>
            <div className={styles.innerContainer}>
  
               
         

                <div >
                    <h2 className={styles.textLarge}>Navigation</h2>
                    <div className={styles.textSmall}><Link to="/shop/products">Products</Link></div>
                    <div className={styles.textSmall}><Link to="/shop/accessories">Accessories</Link></div>
                    <div className={styles.textSmall}><Link to="/shop">Sales</Link></div>
                </div>
    
                <div >
                    <h2 className={styles.textLarge}>Profile</h2>
                    <div className={styles.textSmall}><Link to="/profile">Account</Link></div>
                    <div className={styles.textSmall}><Link to="/cart">Cart</Link></div>
                    <div className={styles.textSmall}><Link to="/ordermenu">Orders</Link></div>
                </div>
                <div >
                    <h2 className={styles.textLarge}>Info</h2>
                    <div className={styles.textSmall}><Link to="/">About</Link></div>
                    
                </div>
                <div >
                    <h2 className={styles.textLarge}>SYMBOLS</h2>
                    <div >
                    <a target="_black" href="#"><FaIcons.FaLinkedinIn className={styles.icons}></FaIcons.FaLinkedinIn></a>
                       <a target="_black" href="https://github.com/Luismrtz"> <FaIcons.FaGithub className={styles.icons}/></a>
                        <a target="_black" href="#"><AiIcons.AiOutlineFileText className={styles.icons}/></a>          
                    </div>
                </div>
            </div>
            <div className={styles.copyRight}>copy right @ Luis martinez</div>
        </div>
    </React.Fragment>
    
  );
}


export default Footer
