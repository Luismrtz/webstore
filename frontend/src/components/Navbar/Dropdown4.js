import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import cx from "classnames";
import styles from "./Navbar.module.scss";
import { useSelector } from "react-redux";

const Dropdown = () => {
  const node = useRef();

  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const handleClick = (e) => {
    if (node.current.contains(e.target)) {
      // inside click
      return;
    }
    // outside click
    setOpen(false);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClick);

    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);

  //? stop body scroll if open
  useEffect(() => {
    open
      ? (document.body.style.overflow = "hidden")
      : (document.body.style.overflow = "");
  }, [open]);

  return (
    <div ref={node} className={styles.dropdownContainerAll}>
      <div
        className={
          open === false ? cx(styles.superNav, styles.hide) : styles.superNav
        }
        onClick={(e) => setOpen(!open)}
      ></div>


        <ul className={styles.cartItem}>

          <li className={styles.hamburgerDiv} onClick={(e) => setOpen(!open)}>
            <FaIcons.FaBars className={styles.hamburgerToggle} />
          </li>
        </ul>

   
      {/* //!open DROPDOWN START */}
      <div
        className={
          open === false
            ? cx(styles.dropdownMenu, styles.inactive)
            : cx(styles.dropdownMenu, styles.active)
        }
      >

        <div className={styles.exitDiv}>
          <AiIcons.AiOutlineClose
            onClick={(e) => setOpen(!open)}
            className={styles.exitToggle}
          />
        </div>
        <div className={styles.wrappTest}>
          <div>
            <Link to={"/"} onClick={(e) => setOpen(!open)}>
              <button
                className={cx(styles.dropdownMenuItem, styles.bordertopNone)}
              >
                Home
              </button>
            </Link>
          </div>

          <div>
            <button
              className={styles.dropdownMenuItem}
              onClick={(e) => setOpen2(!open2)}
            >
              Store
              <span className={styles.collapsePlus}>
                <div className={styles.signSize}>
                  {open2 === false ? "+" : "-"}
                </div>
              </span>
            </button>
            <ul
              className={
                open2 === false
                  ? cx(styles.dropdownMenuInner, styles.hide)
                  : cx(styles.dropdownMenuInner, styles.show)
              }
            >
              <Link to={"/shop/products"} onClick={(e) => setOpen(!open)}>
                <li className={styles.dropdownMenuItemSec}>Products</li>
              </Link>
              <Link to={"/shop/accessories"} onClick={(e) => setOpen(!open)}>
                <li className={styles.dropdownMenuItemSec}>Accessories</li>
              </Link>
              <Link to={"/shop"} onClick={(e) => setOpen(!open)}>
                <li className={styles.dropdownMenuItemSec}>Sales</li>
              </Link>
            </ul>
          </div>


  {userInfo ? (
    <div className={styles.borderlineBotm}>
    <button
      className={styles.dropdownMenuItem}
      onClick={(e) => setOpen3(!open3)}
    >
      Store
      <span className={styles.collapsePlus}>
        <div className={styles.signSize}>
          {open3 === false ? "+" : "-"}
        </div>
      </span>
    </button>
    <ul
      className={
        open3 === false
          ? cx(styles.dropdownMenuInner, styles.hide)
          : cx(styles.dropdownMenuInner, styles.show)
      }
    >
      <Link to={"/profile"} onClick={(e) => setOpen(!open)}>
        <li className={styles.dropdownMenuItemSec}>Account</li>
      </Link>
      <Link to={"/ordermenu"} onClick={(e) => setOpen(!open)}>
        <li className={styles.dropdownMenuItemSec}>Orders</li>
      </Link>
      { userInfo.isAdmin && (
              <Link  to={"/pushItems"} onClick={(e) => setOpen(!open)}>
              <li className={styles.dropdownMenuItemSec}>Push Items</li>
            </Link>
        )
      }
  
    </ul>
    </div>

  ) : (
      <div>
      <Link  to={"/signin"} onClick={(e) => setOpen(!open)}>
        <button
          className={cx(styles.dropdownMenuItem, styles.borderlineBotm)}
        >
          Sign In 
        </button>
      </Link>
    </div>
  )}

          <div className={styles.dropdownItemContainer}>
               <div className={styles.itemSpacing}>
                    <a target="_black" href="#"><FaIcons.FaLinkedinIn className={styles.icons}></FaIcons.FaLinkedinIn></a>
                    <a target="_black" href="https://github.com/Luismrtz"> <FaIcons.FaGithub className={styles.icons}/></a>
                    <a target="_black" href="#"><AiIcons.AiOutlineFileText className={styles.icons}/></a>
                </div>          
           </div>
         

        </div>

        {/* ))} */}
      </div>
       {/* //!open DROPDOWN END */}
    </div>
  );
};

export default Dropdown;
