// import React, {useContext, useState, useCallback} from 'react';
// import styles from './Details.module.scss';
// import {ProductContext} from '../context/context';
// import {Link} from 'react-router-dom';



// import useListener from './Uselisteners';
import cx from 'classnames';
//* Sync 
//* if match, 
const Details = (props) => {
    //todo STORE IN OWN CONTEXT? TO PASS THROUGH MORE THAN ONE FILE?
    //todo... but It is LINKED to a context already. Via storeProducts database. 
    //todo... so SHOULD I? or maybe include it inside the context with rtrMatch 
    let {storeProducts} = useContext(ProductContext);
    const rtrMatch = storeProducts.find(item => item.title === props.match.params.id);
//     const [coords, setCoords] = useState({ x: 0, y: 0})
     
//    const handler = useCallback(({ clientX, clientY}) => {
//        setCoords({ x: clientX, y: clientY});
//    }, [setCoords]);

//    useListener('mousemove', handler);
   

   // const zoom = useRef(null);

  

//    const [coords, setCoords] = useState({ x: 0, y: 0 });

//    // Event handler utilizing useCallback ...
//    // ... so that reference never changes.
//    const handler = useCallback(
//      ({ clientX, clientY }) => {
//        // Update coordinates
//        setCoords({ x: clientX, y: clientY });
//      },
//      [setCoords]
//    );
 
//    // Add event listener using our hook
//    useListener('mousemove', handler);








    return (
<div className={styles.container}>

                {/* <h1>the mouse is ({coords.x}, {coords.y})</h1> */}
    <div className={styles.titleContainer}>

        <h1 className={cx(styles.title, styles.center)}>{rtrMatch.title}</h1>
         <h2 className={cx(styles.subTitle, styles.center)}>
         <Link to="/" className={styles.cStyle}>HOME</Link>&nbsp;/&nbsp; 
         <Link to="/" className={styles.cStyle}>DUCKS</Link>&nbsp;/&nbsp;{rtrMatch.title}</h2>
    </div>


    
<div className={styles.grid}>

            {/* grid 1 */}
        <div className={styles.tinyGrid}>
            <img  className={styles.image1} src={'/' + rtrMatch.img} alt="duckens"></img>
            {/* <img className={styles.image2} src={'/' + rtrMatch.img} alt="duckens"></img> */}
        </div>

            {/* grid 2 */}
        <div   className={styles.imgOverlay}>
            <img className={styles.image} src={'/' + rtrMatch.img} alt="duckens"/>
        </div>
            {/* grid 3 */}
        <div className={styles.contents}>
            <div className={ styles.contDesc}>
                <h1 className={styles.title}>{rtrMatch.title}</h1>
                <h2 className={styles.price}>${rtrMatch.price}.00</h2>
                <h3 className={ styles.descript}>{rtrMatch.info}</h3>
            </div>
        
            <div className={styles.listIcons}>
                <div className={styles.wrap}>
                    
                    <div className={styles.qtext}>
                        Qty: <select className={styles.quantity}>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            </select>
                    </div>


                    <Link  to="/cart"className={styles.button2}>Add to Cart</Link>
                    <div className={styles.liked}>&#10084;</div> 

                </div>
                <div className={styles.category}>Categories: 
                            <Link to="/" className={styles.cStyle}>Ducks</Link>
                </div>
            </div> 
        </div>

</div> 
</div>
      
    )
}

export default Details;