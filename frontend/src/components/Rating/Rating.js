import React from 'react';
import * as IoIcons from 'react-icons/io';
import styles from './Rating.module.scss';

export default function Rating(props) {
    return !props.value ? (
        <div></div>
    ) : (
        <div className={styles.rating}>
            <span>
            {
                props.value >= 1 
                ?  <IoIcons.IoMdStar/>
                : props.value >= 0.5
                ? <IoIcons.IoMdStarHalf/>
                : <IoIcons.IoMdStarOutline/>
            }
            </span>
            <span>
              {
                props.value >= 2 
                ?  <IoIcons.IoMdStar/>
                : props.value >= 1.5
                ? <IoIcons.IoMdStarHalf/>
                : <IoIcons.IoMdStarOutline/>
            }
            </span>
            <span>
             {
                props.value >= 3 
                ?  <IoIcons.IoMdStar/>
                : props.value >= 2.5
                ? <IoIcons.IoMdStarHalf/>
                : <IoIcons.IoMdStarOutline/>
            }
            </span>
            <span>
            {
                props.value >= 4
                ?  <IoIcons.IoMdStar/>
                : props.value >= 3.5
                ? <IoIcons.IoMdStarHalf/>
                : <IoIcons.IoMdStarOutline/>
            }
            </span>
            <span>
             {
                props.value >= 5
                ?  <IoIcons.IoMdStar/>
                : props.value >= 4.5
                ? <IoIcons.IoMdStarHalf/>
                : <IoIcons.IoMdStarOutline/>
            }
            </span>
            <span>{props.text ? props.text : ''}</span>
        </div>
    )
}


// import React from 'react';
// //import * as IoIcons from 'react-icons/io';
// import styles from './Rating.module.scss';

// export default function Rating(props) {
//     return !props.value ? (
//         <div></div>
//     ) : (
//         <div className={styles.rating}>
//             <span>
//             <i
//             className={
//                 props.value >= 1 
//                 ?  'fa fa-star'
//                 : props.value >= 0.5
//                 ? 'fa fa-start-half-o'
//                 : 'fa fa-star-o'
//             }
//             ></i>
//             </span>
//             <span>
//                 <i
//               className={
//                   props.value >= 2
//                   ?  'fa fa-star'
//                   : props.value >= 1.5
//                   ? 'fa fa-start-half-o'
//                   : 'fa fa-star-o'
//             }
//             ></i>
//             </span>
//             <span>
//                 <i
//              className={
//              props.value >= 3 
//              ?  'fa fa-star'
//              : props.value >= 2.5
//              ? 'fa fa-start-half-o'
//              : 'fa fa-star-o'
//             }
//             ></i>
//             </span>
//             <span>
//                 <i
//           className={
//                props.value >= 4 
//                ?  'fa fa-star'
//                : props.value >= 3.5
//                ? 'fa fa-start-half-o'
//                : 'fa fa-star-o'
//             }
//             ></i>
//             </span>
//             <span>
//                 <i
//              className={
//              props.value >= 5 
//              ?  'fa fa-star'
//              : props.value >= 4.5
//              ? 'fa fa-start-half-o'
//              : 'fa fa-star-o'
//             }
//             ></i>
//             </span>
//             <span>{props.text ? props.text : ''}</span>
//         </div>
//     )
// }
