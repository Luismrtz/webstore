import React, {useContext} from 'react';
import {ReactComponent as Icon} from '../assets/ducky.svg';
import {Link} from 'react-router-dom';
// import Searchbar from '../Searchbar/Searchbar'  WIP
import cx from 'classnames';
import styles from './Navbar.module.scss'
import '../globalStyles/global.scss'

//todo for navbar (cart icon increment) code might be for 'cart' file
// let alreadyExists = false;
// cartItems.forEach((x) => {
//   if (x._id === product._id) {
//     alreadyExists = true;
//     x.count++;
//   }
// });
// if (!alreadyExists) {
//   cartItems.push({ ...product, count: 1 });
// }






const Navbar = () => {
    return (
        <nav className={styles.container}>
        {/* https://www.iconfinder.com/icons/6383229/baby_cartoon_cute_duck_icon 
        Creative
        Commons (Attribution 3.0 Unported);
        https://www.iconfinder.com/LABdsgn*/}

            <ul className={cx(styles.center, styles.logo)}>
                {/* <li><Link to="/" className={styles.logo}>DUCKIES</Link></li> */}
                <Link to="/"><Icon alt="quack" className={styles.image}/></Link>
            </ul>
            <ul className={cx(styles.center,styles.title)}>
                <li><Link to="/" className={cx(styles.title1)}>DUCKIES</Link></li>
                {/* <li><Link to="/"><Icon alt="quack" className={styles.logo}/>Dookies</Link></li> */}
                {/* <li><Link to="/" >Duckies</Link></li> */}
            </ul>
            {/* <Searchbar /> WIP */}
            <ul className={cx(styles.center, styles.links)}>
            <li><Link to="/shop/products">Products</Link></li>
            <li><Link to="/shop/accessories">Accessories</Link></li>
                <li><Link to="/details">Account</Link></li>
                <li><Link to="/cart">Cart ( 1 )</Link></li>     
            </ul>
        </nav>
   
    )
}

export default Navbar;