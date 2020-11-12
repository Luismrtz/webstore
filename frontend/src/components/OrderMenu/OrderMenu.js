import React, {useEffect} from 'react';
import styles from './OrderMenu.module.scss';
import {Link} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import Loading from '../spinner/Loading';
import ErrorMsg from '../errorMsg/ErrorMsg';
import cx from 'classnames';
import Footer from '../Footer/Footer';
import { listOrders, deleteOrder} from '../../actions/orderActions';


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
    }, [dispatch, successDelete])


    const deleteHandler = (order) => {
        if(window.confirm('Are you sure you want to delete?')) {
        dispatch(deleteOrder(order._id))
        }
    }

    return loading ? <div><Loading/></div> : error ? <ErrorMsg variant="danger">{error}</ErrorMsg>
    :
    (

    <div className={styles.mainContainer}>

        <div className={styles.content}>
            <div className={styles.productHeader}>
                <h3>ORDERS</h3>
                {loadingDelete && <Loading/>}
                {errorDelete && <ErrorMsg variant="danger">{errorDelete}</ErrorMsg>}
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
                            <th>IS DELIVERED</th>
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
                                {/* <td>{order.deliveredAt}</td> */}
                                <td className={styles.btnwrap}>
                                    <Link to={"/order/" + order._id} ><button className={cx(styles.button)}>Details</button></Link>
                                        {' '}
                                    <button type="button" className={cx(styles.button, styles.secondary)} onClick={() => deleteHandler(order)}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>



            </div>
        </div>

        


    <Footer/>
    </div>
      
    )
}

export default OrderMenu;