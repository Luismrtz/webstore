import React, {useEffect, useState} from 'react';
import styles from './OrderMenu.module.scss';
import {Link} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import cx from 'classnames';
import Footer from '../Footer/Footer';
import { saveOrders, listOrders, deleteOrder} from '../../actions/orderActions';
// import AdminHideShow from './AdminHideShow';


const OrderMenu = (props) => {

    const orderList = useSelector(state => state.orderList);
    const {orders, loading, error} = orderList;

    const orderDelete = useSelector(state => state.orderDelete);
    const {loading: loadingDelete, success: successDelete, error: errorDelete} = orderDelete;

    const dispatch = useDispatch();

    useEffect(() => {
  
         dispatch(listOrders());
        return () => {
            //
            
        }
    }, [successDelete])


    
console.log(orders);
  

    const deleteHandler = (order) => {
        dispatch(deleteOrder(order._id))
    }

    return loading ? <div>Loading...</div> :
    (

    <React.Fragment>

        <div className={cx(styles.content, styles.contentMargined)}>
            <div className={styles.productHeader}>
                <h3>Orders</h3>
            </div>
           
            <div className={styles.productList}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>DATE</th>
                            <th>TOTAL</th>
                            <th>USER</th>
                            <th>IS PAID</th>
                            <th>PAID AT</th>
                            <th>DELIVERED</th>
                            <th>ACTIONS</th>                        
                        </tr>
                    </thead>

                    <tbody>
                        {orders.map((order) => (
                            <tr key={order._id}>
                                <td>{order._id}</td>
                                <td>{order.createdAt}</td>
                                <td>{order.totalPrice}</td>
                                <td>{order.user.name}</td>
                                <td>{order.isPaid.toString()}</td>
                                <td>{order.paidAt}</td>
                                <td>{order.isDelivered.toString()}</td>
                                <td>{order.deliveredAt}</td>
                                <td>
                                    <Link to={"/order/" + order._id} className={cx(styles.button, styles.buttonSecondary)}>Details</Link>
                                        {' '}
                                    <button type="button" className={cx(styles.button, styles.secondary)} onClick={() => deleteHandler(order)}>
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

                    {orders.map(product => 
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



        {/* <button style={{marginTop: '8rem', backgroundColor: 'black'}} onClick={(e) => {setVisibility(!visibility)}}>
            CLICK THIS DAMN SHIT
        </button> */}
        


    <Footer/>
    </React.Fragment>
      
    )
}

export default OrderMenu;