import React from 'react';
import styles from './Banner.module.scss'
import {Link} from 'react-router-dom';


//? image resolution on smaller resolutions
const useViewport = () => {
    const [width, setWidth] = React.useState(window.innerWidth);
  
    React.useEffect(() => {
      const handleWindowResize = () => setWidth(window.innerWidth);
      window.addEventListener("resize", handleWindowResize);
      return () => window.removeEventListener("resize", handleWindowResize);
    }, []);
  
    // Return the width so we can use it in our components
    return { width };
  }





const Imgbanner = ({ product: {_id, img, img2, info,link, title} }) => {
    const { width } = useViewport();
    const breakpoint = 768;
    
    
    // let imgStyles = {
    //     width: 100 + "%",
    //     height: 100 + "%",
    //     objectFit: 'cover'
    // }
    return (
            <div className={styles.bContainer}>
                <img src={width < breakpoint ? img2 : img} alt="slider-img" id={_id} className={styles.imgStyles}></img>
                <Link to={`${link}`} className={styles.block}>
                    <div className={styles.innerBlock}>
                        <div  className={styles.bannerText}>{info}</div>
                    </div>
                </Link>
            </div>
    )
}

export default Imgbanner;