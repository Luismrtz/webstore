import React, {useEffect, useState} from 'react';
import styles from './PushProducts.module.scss';
import {useSelector, useDispatch} from 'react-redux';
import cx from 'classnames';
import Footer from '../footer/Footer';
import Loading from '../spinner/Loading';
import ErrorMsg from '../errorMsg/ErrorMsg';
import { saveProduct, listProducts, deleteProduct} from '../../actions/productActions';
import Axios from 'axios';


const PushProducts = (props) => {
    const [id, setId] = useState('');
    const [title, setTitle] = useState('');
    const [img, setImg] = useState('');
    const [price, setPrice] = useState('');
    const [info, setInfo] = useState('');
    const [stock, setStock] = useState('');
    const [type, setType] = useState('');
    const [sale, setSale] = useState(false);
    const [discount, setDiscount] = useState('');
    const [mainPage, setMainPage] = useState(false);
    const [newItem, setNewItem] = useState(false);
    const [uploading, setUploading] = useState(false);

    const [visibility, setVisibility] = useState(false);

    const pList = useSelector(state => state.pList);
    const {products} = pList;
    //const {products, loading, error} = pList;

    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;

    const productSave = useSelector(state => state.productSave);
    const {loading: loadingSave, success: successSave, error: errorSave} = productSave;

    const productDelete = useSelector(state => state.productDelete);
    const { success: successDelete, error: errorDelete} = productDelete;
    //const {loading: loadingDelete, success: successDelete, error: errorDelete} = productDelete;

    const dispatch = useDispatch();

    useEffect(() => {
        if (successSave) {
            setVisibility(false);
        }
         dispatch(listProducts());
        return () => {
            //
            
        }
    }, [dispatch,successSave, successDelete])

    const editItem = (product) => {
        setVisibility(true);
        setId(product._id);
        setTitle(product.title);
        setImg(product.img);
        setPrice(product.price);
        setInfo(product.info);
        setStock(product.stock);
        setType(product.type);
        setSale(product.sale);
        setDiscount(product.discount);
        setMainPage(product.mainPage);
        setNewItem(product.newItem);
       
    }
    

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveProduct({ _id: id, title, img, price, info,
            stock, type, sale, discount, mainPage, newItem
        }));
    }

    const deleteHandler = (product) => {
        if(window.confirm('Are you sure you want to delete?')) {
            dispatch(deleteProduct(product._id))
        }
    }



  

    const uploadFileHandler = (e) => {
        const file = e.target.files[0];
        const bodyFormData = new FormData();
        const requestPost = {
            method: 'POST',
            url: '/uploads',
            data: bodyFormData,
            headers:  (userInfo && userInfo.token) ? {
                Authorization: 'Bearer ' + userInfo.token
            } : {}
        }

        bodyFormData.append('image', file);
        setUploading(true);
        Axios(requestPost).then(response => {
            setImg(response.data);
            setUploading(false);
        }).catch(err => {
            setUploading(false);
        })
    }


    return (
    <div className={styles.pageWrapper}>

        <div className={styles.content}>
            <div className={styles.productHeader}>
                <h3>PRODUCTS</h3>
                {errorDelete && <ErrorMsg variant="danger2">{errorDelete}</ErrorMsg>}
            </div>
           
            <div className={styles.productList}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Title</th>
                            <th>Price</th>
                            <th>Type</th>
                            <th>Sale</th>
                            <th>SalePrice</th>
                            <th>MainPage</th>
                            <th>NewItem</th>                          
                            <th>Actions</th>                          
                        </tr>
                    </thead>

                    <tbody>
                        {products.map((product) => (
                            <tr key={product._id}>
                                <td>{product._id}</td>
                                <td>{product.title}</td>
                                <td>{product.price}</td>
                                <td>{product.type}</td>
                                <td>{JSON.stringify(product.sale)}</td>
                                <td>{product.discount}</td>
                                <td>{JSON.stringify(product.mainPage)}</td>
                                <td>{JSON.stringify(product.newItem)}</td>
                                <td className={styles.btnwrap}>
                                    <button className={styles.button} onClick={()=> editItem(product)}>
                                        Edit
                                    </button>{' '}
                                    <button className={styles.button} onClick={() => deleteHandler(product)}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
  


            </div>
            <div className={styles.buttonContainer}>
                    {visibility === false ? 

                    <button className={styles.button} onClick={() => editItem({})}>Create Product</button>
                    : 
                    <button type="button" className={cx(styles.button)} onClick={(e) => setVisibility(!visibility)}>Back</button>
                    }
                 </div>
        </div>

       {visibility && 
        <div className={styles.form}>
            <form onSubmit={submitHandler}>
            <ul className={styles.formContainer}>
                <li>
                    <h2 className={styles.title}>Create an Item</h2>
                </li>
                <li>
                    {loadingSave && <div><Loading/></div>}
                    {errorSave && <ErrorMsg variant="danger2">{errorSave}</ErrorMsg>}
                </li>
                <li>{id}</li>
                <li>
                    <label htmlFor="title">
                        Title
                    </label>
                    <input type="text" name="title" id="title" value={title || ''} onChange={(e) => setTitle(e.target.value)}></input>
                </li>

                <li>
                    <label htmlFor="img">
                        Image
                    </label>
                    <input type="text" name="image" id="img" value={img || ''} onChange={(e) => setImg(e.target.value)}></input>
                    <input type="file" onChange={uploadFileHandler}></input>
                    {uploading && <div>Uploading...</div>}
                </li>

                <li>
                    <label htmlFor="price">
                        Price
                    </label>
                    <input type="text" name="price" id="price" value={price || ''} onChange={(e) => setPrice(e.target.value)}></input>
                </li>

                <li>
                    <label htmlFor="info">
                        Info
                    </label>
                    <input type="text" name="info" id="info" value={info || ''} onChange={(e) => setInfo(e.target.value)}></input>
                </li>

 


                <li>
                    <label htmlFor="stock">
                        Stock
                    </label>
                    <input type="text" name="stock" id="stock" value={stock || ''} onChange={(e) => setStock(e.target.value)}></input>
                </li>

     

                <li>
                    <label htmlFor="type">
                        Type
                    </label>
                    <input type="text" name="type" id="type" value={type || ''} onChange={(e) => setType(e.target.value)}></input>
                </li>

                <li>
                    <label htmlFor="sale">
                        Sale
                    </label>
                    <input type="checkbox" checked={sale} name="sale" id="sale" value={sale} onChange={(e) => setSale(!sale)}></input>
                </li>

                <li>
                    <label htmlFor="discount">
                        Discount Price
                    </label>
                    <input type="text" name="discount" id="discount" value={discount || ''} onChange={(e) => setDiscount(e.target.value)}></input>
                </li>

                <li>
                    <label htmlFor="mainPage">
                        Display on Main Page ? (max 3) {mainPage}
                    </label>
                    <input type="checkbox" checked={mainPage || ''} name="mainPage" id="mainPage" value={mainPage || ''} onChange={(e) => setMainPage(!mainPage)}></input>
                </li>

                <li>
                    <label htmlFor="newItem">
                        New Product {newItem}
                    </label>
                    <input type="checkbox"  checked={newItem || ''}   name="newItem" id="newItem" value={newItem || ''} onChange={(e) => setNewItem(!newItem)}></input>
                </li>
  
                <li>
                    <button type="submit" className={cx(styles.button, styles.buttonSize)}>{id? "Update" : "Create"}</button>
                </li>
                <li>
                    <button type="button" className={cx(styles.button, styles.buttonSize)} onClick={(e) => setVisibility(!visibility)}>Back</button>
                </li>
              
            </ul>
            </form>
        </div>
}

    <Footer/>
    </div>
      
    )
}

export default PushProducts;