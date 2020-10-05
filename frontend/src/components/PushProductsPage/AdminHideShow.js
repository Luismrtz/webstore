// import React, {useEffect, useState} from 'react';
// import styles from './PushProducts.module.scss';
// import {Link} from 'react-router-dom';
// import {useSelector, useDispatch} from 'react-redux';
// import cx from 'classnames';
// import Footer from '../Footer/Footer';
// import { saveProduct } from '../../actions/productActions';


// const AdminHideShow = ({props, ifTrue, clicking}) => {


    
//     let [nowTrue, setIfTrue] = useState(ifTrue)

//     const [title, setTitle] = useState('');
//     const [img, setImg] = useState('');
//     const [price, setPrice] = useState('');
//     const [info, setInfo] = useState('');
//     const [stock, setStock] = useState('');
//     const [type, setType] = useState('');
//     const [sale, setSale] = useState(false);
//     const [discount, setDiscount] = useState('');
//     const [mainPage, setMainPage] = useState(false);
//     const [newItem, setNewItem] = useState(false);

//     // const productList = useSelector(state => state.productList);
//     // const {loading, products, error} = productList;
//     const productSave = useSelector(state => state.productSave);
//     const {loading: loadingSave, success: successSave, error: errorSave} = productSave;
//     const dispatch = useDispatch();



//     const submitHandler = (e) => {
//         e.preventDefault();
//         dispatch(saveProduct({title, img, price, info,
//             stock, type, sale, discount, mainPage, newItem
//         }));
//     }

//     console.log(ifTrue);
//     console.log(nowTrue)
//     // return loading ? <div>Loading...</div> :
//     // error || !product ? <div>{error}</div> :
//     return(
//     <React.Fragment >

 
//     </React.Fragment>
      
//     )
// }

// export default AdminHideShow;