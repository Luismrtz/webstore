// import React , { useState, useEffect, useCallback, useContext} from 'react';
// import styles from './Banner.module.scss'
// import Imgbanner from './Imgbanner'
// import cx from 'classnames';
// import {ProductContext} from '../context/context'

//todo push images into data.js & pull through useContext
//todo grab lower res images for phones


// import i1 from './slider/antique.jpg'
// import i2 from './slider/baddie.jpg'
// import i3 from './slider/banner.jpg'
// import i4 from './slider/triohero.jpg'



const Banner = () => {
    const [sliderArr, setSliderArr] = useState([]);
    //let {bSmall} = useContext(bannerSmall)
    let {bannerLarge} = useContext(ProductContext)
    
    useEffect(() => {
        setSliderArr(
            // <Imgbanner src={i1}/>,
            // <Imgbanner src={i2}/>,
            // <Imgbanner src={i3}/>,
            // <Imgbanner src={i4}/>
          (bannerLarge && bannerLarge.map(product => {
                return <Imgbanner product={product}   />
                
            }))
    
            );
     
    }, [bannerLarge])

    console.log(sliderArr)

    const [x, setX] = useState(0);
    // const goLeft = useCallback(() => {
    //     x === 0 ? setX(-100 * (sliderArr.length - 1)) : setX(x + 100);
    // }, [sliderArr.length, x]);
    const goLeft = () => {
        x === 0 ? setX(-100 * (sliderArr && sliderArr.length - 1)) : setX(x + 100);
    };
    const goRight = useCallback(() => {
        x === -100 * (sliderArr && sliderArr.length - 1) ? setX(0) : setX(x - 100);
    },[sliderArr && sliderArr.length, x] );


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
                        {/* <p className={styles.bannerText}>{info}</p> */}
                       
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