import React, { useState, useEffect } from "react";
import styles from "./Profile.module.scss";
import { Link } from "react-router-dom";
import cx from "classnames";
import Footer from "../Footer/Footer";
import { logout, update } from "../../actions/userActions";
import { listMyOrders } from "../../actions/orderActions";
import { useDispatch, useSelector } from "react-redux";

const Profile = (props) => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const handleLogout = () => {
    dispatch(logout());
    props.history.push("/signin");
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(update({ userId: userInfo._id, email, name, password }));
  };

  const userUpdate = useSelector((state) => state.userUpdate);
  const { loading, success, error } = userUpdate;

  const myOrderList = useSelector((state) => state.myOrderList);
  const { loading: loadingOrders, orders, error: errorOrders } = myOrderList;

  useEffect(() => {
    if (userInfo) {
      console.log(userInfo.name);
      setEmail(userInfo.email);
      setName(userInfo.name);
      setPassword(userInfo.password);
    }
    dispatch(listMyOrders());
    return () => {};
  }, [userInfo]);

  console.log(orders);

  return (
    <React.Fragment>
      <div className={styles.profile}>
        <div className={styles.profileInfo}>
          <div className={styles.form}>
            <form onSubmit={submitHandler}>
              <ul className={styles.formContainer}>
                <li>
                  <h2 className={styles.title}>User Profile</h2>
                </li>
                <li>
                  {loading && <div>loading...</div>}
                  {error && <div>{error}</div>}
                  {success && <div>Profile Saved Successfully</div>}
                </li>
                <li>
                  <label htmlFor="name">Name</label>
                  <input
                    value={name || ""}
                    type="name"
                    name="name"
                    id="name"
                    onChange={(e) => setName(e.target.value)}
                  ></input>
                </li>
                <li>
                  <label htmlFor="email">Email</label>
                  <input
                    value={email || ""}
                    type="email"
                    name="email"
                    id="email"
                    onChange={(e) => setEmail(e.target.value)}
                  ></input>
                </li>
                <li>
                  <label htmlFor="password">Password</label>
                  <input
                    value={password || ""}
                    type="password"
                    id="password"
                    name="password"
                    onChange={(e) => setPassword(e.target.value)}
                  ></input>
                </li>

                <li>
                  <button type="submit" className={styles.button}>
                    Update
                  </button>
                </li>
                <li className={styles.text}>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className={cx(
                      styles.button,
                      styles.secondary,
                      styles.fullWidth
                    )}
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </form>
          </div>
        </div>
        <div className={styles.profileOrders}>
          {loadingOrders ? (
            <div>Loading...</div>
          ) : errorOrders ? (
            <div>{errorOrders}</div>
          ) : (
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>DATE</th>
                  <th>TOTAL</th>
                  <th>PAID</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id}>
                    <td>{order._id}</td>
                    <td>{order.createdAt}</td>
                    <td>{order.totalPrice}</td>
                    <td>{order.isPaid}</td>
                    <td>
                        
                      <Link  to={"/order/" + order._id}><button className={styles.button}>DETAILS</button></Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default Profile;
