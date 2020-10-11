import React, {useEffect, useState} from 'react';
import styles from './PushProducts.module.scss';
import {Link} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import cx from 'classnames';
import Footer from '../Footer/Footer';
import { saveProduct, listProducts, deleteProduct} from '../../actions/productActions';
import Axios from 'axios';
// import AdminHideShow from './AdminHideShow';


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
    const {products, loading, error} = pList;

    const productSave = useSelector(state => state.productSave);
    const {loading: loadingSave, success: successSave, error: errorSave} = productSave;

    const productDelete = useSelector(state => state.productDelete);
    const {loading: loadingDelete, success: successDelete, error: errorDelete} = productDelete;

    const dispatch = useDispatch();

    useEffect(() => {
        if (successSave) {
            setVisibility(false);
        }
         dispatch(listProducts());
        return () => {
            //
            
        }
    }, [successSave, successDelete])

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
        dispatch(deleteProduct(product._id))
    }

    // return loading ? <div>Loading...</div> :
    // error || !products ? <div>{error}</div> :
    // (

    const uploadFileHandler = (e) => {
        const file = e.target.files[0];
        const bodyFormData = new FormData();
        bodyFormData.append('image', file);
        setUploading(true);
        Axios.post('/uploads', bodyFormData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(response => {
            setImg(response.data);
            setUploading(false);
        }).catch(err => {
            console.log(err);
            setUploading(false);
        })
    }


    return (
    <React.Fragment>

        <div className={cx(styles.content, styles.contentMargined)}>
            <div className={styles.productHeader}>
                <h3>Products</h3>
                <button onClick={() => editItem({})}>Create Product</button>
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
                                <td>
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



                    {/* <div className={cx(styles.spacing, styles.categories)}>
                            
                            <div className={styles.itemRemove}></div>
                            <div className={styles.itemThumbnail}></div>
                            <div className={styles.itemName}>Product</div>
                            <div className={cx(styles.itemPrice)}>Price</div>
                            <div className={cx(styles.itemQuantity)}>Quantity</div>
                            <div className={cx( styles.total, styles.hideShow)}>subtotal</div>
                        
                    </div>

                    {products.map(product => 
                        <div className={cx(styles.spacing, styles.spacingItems )} key={product.id}>

                               
                                <div className={cx(styles.itemName)}>{product.id}</div>
                                <div className={cx(styles.itemName)}>
                                    <Link to={"/details/" + product.id }>
                                        {item.name}
                                    </Link>
                                </div>
                                <div className={styles.itemName}>${item.price}.00</div>
                                <div className={styles.itemName}>${item.price}.00</div>
                                
                

                                <div className={styles.itemQuantity}>
                                    Qty:
                                        <select value={item.qty} onChange={(e) => dispatch(addToCart(item.id, Number(e.target.value)))}>
                                            {[...Array(item.stock).keys()].map(x => 
                                                <option key={x + 1} value={x + 1}>{x + 1}</option>
                                                )}
                                        </select>
                                  
                                </div>
                                <div className={cx(styles.total, styles.hideShow)}>{(item.sale ? item.discount : item.price) * item.qty}</div>

                        </div>
                        
                    
                    )} */}

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
                    {loadingSave && <div>loading...</div>}
                    {errorSave && <div>{errorSave}</div>}
                </li>
                <li>{id}</li>
                <li>
                    <label htmlFor="title">
                        Title
                    </label>
                    <input type="text" name="title" id="title" value={title} onChange={(e) => setTitle(e.target.value)}></input>
                </li>

                <li>
                    <label htmlFor="img">
                        Image
                    </label>
                    <input type="text" name="image" id="img" value={img} onChange={(e) => setImg(e.target.value)}></input>
                    <input type="file" onChange={uploadFileHandler}></input>
                    {uploading && <div>Uploading...</div>}
                </li>

                <li>
                    <label htmlFor="price">
                        Price
                    </label>
                    <input type="text" name="price" id="price" value={price} onChange={(e) => setPrice(e.target.value)}></input>
                </li>

                <li>
                    <label htmlFor="info">
                        Info
                    </label>
                    <input type="text" name="info" id="info" value={info} onChange={(e) => setInfo(e.target.value)}></input>
                </li>

 


                <li>
                    <label htmlFor="stock">
                        Stock
                    </label>
                    <input type="text" name="stock" id="stock" value={stock} onChange={(e) => setStock(e.target.value)}></input>
                </li>

     

                <li>
                    <label htmlFor="type">
                        Type
                    </label>
                    <input type="text" name="type" id="type" value={type} onChange={(e) => setType(e.target.value)}></input>
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
                    <input type="text" name="discount" id="discount" value={discount} onChange={(e) => setDiscount(e.target.value)}></input>
                </li>

                <li>
                    <label htmlFor="mainPage">
                        Display on Main Page ? (max 3) {mainPage}
                    </label>
                    <input type="checkbox" checked={mainPage} name="mainPage" id="mainPage" value={mainPage} onChange={(e) => setMainPage(!mainPage)}></input>
                </li>

                <li>
                    <label htmlFor="newItem">
                        New Product {newItem}
                    </label>
                    <input type="checkbox"  checked={newItem}   name="newItem" id="newItem" value={newItem} onChange={(e) => setNewItem(!newItem)}></input>
                </li>
  
                <li>
                    <button type="submit" className={styles.button}>{id? "Update" : "Create"}</button>
                </li>
                <li>
                    <button type="button" className={styles.button} onClick={(e) => setVisibility(!visibility)}>Back</button>
                </li>
              
            </ul>
            </form>
        </div>
}

        {/* <button style={{marginTop: '8rem', backgroundColor: 'black'}} onClick={(e) => {setVisibility(!visibility)}}>
            CLICK THIS DAMN SHIT
        </button> */}
        


    <Footer/>
    </React.Fragment>
      
    )
}

export default PushProducts;