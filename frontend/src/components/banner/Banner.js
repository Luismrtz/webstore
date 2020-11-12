import React , { useState, useEffect, useCallback} from 'react';
import styles from './Banner.module.scss'
import Imgbanner from './Imgbanner'
import cx from 'classnames';


const Banner = ({banners}) => {
    const [sliderArr, setSliderArr] = useState([]);


    useEffect(() => {
        setSliderArr(
  
          (banners && banners.map(banner => {
                return <Imgbanner banner={banner}   />
                
            }))
    
            );
        return () => {
    
        }
    }, [banners])




    const [x, setX] = useState(0);
    const goLeft = () => {
        x === 0 ? setX(-100 * (sliderArr && sliderArr.length - 1)) : setX(x + 100);
    };
    const goRight = useCallback(() => {
        x === -100 * (sliderArr && sliderArr.length - 1) ? setX(0) : setX(x - 100);
    },[sliderArr, x] );


useEffect(() => {
    const timer = setTimeout(() => {
         goRight();
    }, 7000);
    return () => {
        clearTimeout(timer)
    }
}, [goRight])



    return (
        <div className={styles.slider}>

            
            {sliderArr && sliderArr.map((item, id, info) => {
                return (
                    <div key={id} className={styles.slide} style={{transform: `translateX(${x}%)`}}>
                        {item}
  
                       
                    </div>
                 
            
                );
            })}
            
            <div className={cx(styles.circle, styles.c1)} onClick={goLeft}>
                <div className={cx(styles.goLeft, styles.arrow)} >
            </div>
            
            </div>
           
            <div className={cx(styles.circle, styles.c2)} onClick={goRight}>
                <div className={cx(styles.goRight, styles.arrow)} >
            </div>
          
            </div>



        </div>


    )



}

export default Banner;