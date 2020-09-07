import './Navbar2.scss';
// import { ReactComponent as BellIcon } from './icons/bell.svg';
// import { ReactComponent as MessengerIcon } from './icons/messenger.svg';
// import { ReactComponent as CaretIcon } from './icons/caret.svg';
// import { ReactComponent as PlusIcon } from './icons/plus.svg';
// import { ReactComponent as CogIcon } from './icons/cog.svg';
// import { ReactComponent as ChevronIcon } from './icons/chevron.svg';
// import { ReactComponent as ArrowIcon } from './icons/arrow.svg';
// import { ReactComponent as BoltIcon } from './icons/bolt.svg';

import React, { useState, useEffect, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';

function Navbar2() {
  const [truuu, setTruuu] = useState(false);
  return (
    <Navbar>
      <NavItemFull className="yup" icon={'home'} />
      <NavItemFull className="yup" icon={'store'}>
        <DropdownMenu></DropdownMenu>
      </NavItemFull>
      <NavItemFull className="yup" icon={'profile'} />
      <NavItemFull className="yup" icon={'cart'} />

       <NavItem className="nope" icon={'burger'}>
        <DropdownMenu ></DropdownMenu>
      </NavItem>

    </Navbar>
  );
}

function Navbar(props) {
  return (
    <nav className="navbar">
      <ul>HELLO</ul>
      <ul className="navbar-nav">{props.children}</ul>
    </nav>
  );
}
function NavItemFull(props) {
  const [open, setOpen] = useState(false);

  return (
    <li className="nav-item yup">
      <a href="#" className="icon-button" onClick={() => setOpen(!open)}>
        {props.icon}
      </a>

      {open && props.children}
    </li>
  );
}

function NavItem(props) {
  const [open, setOpen] = useState(false);

  return (
    <li className="nav-itemNope">
      <a href="#" className="icon-button" onClick={() => setOpen(!open)}>
        {props.icon}
      </a>

      {open && props.children}
    </li>
  );
}

function DropdownMenu() {
  const [activeMenu, setActiveMenu] = useState('main');
  const [menuHeight, setMenuHeight] = useState(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    setMenuHeight(dropdownRef.current?.firstChild.offsetHeight)
  }, [])

  function calcHeight(el) {
    const height = el.offsetHeight;
    setMenuHeight(height);
  }

  function DropdownItem(props) {
    return (
      <a href="#" className="menu-item" onClick={() => props.goToMenu && setActiveMenu(props.goToMenu)}>
        <span className="icon-button">{props.leftIcon}</span>
        {props.children}
        <span className="icon-right">{props.rightIcon}</span>
      </a>
    );
  }

  return (
    <div className="dropdown" style={{ height: menuHeight }} ref={dropdownRef}>

      <CSSTransition
        in={activeMenu === 'main'}
        timeout={500}
        classNames="menu-primary"
        unmountOnExit
        onEnter={calcHeight}>
        <div className="menu">
          <DropdownItem>My Profile</DropdownItem>
          <DropdownItem
            leftIcon={'hi'}
            rightIcon={'hi'}
            goToMenu="settings">
            Settings
          </DropdownItem>
          <DropdownItem
            leftIcon="🦧"
            rightIcon={'hi'}
            goToMenu="animals">
            Animals
          </DropdownItem>

        </div>
      </CSSTransition>

      <CSSTransition
        in={activeMenu === 'settings'}
        timeout={500}
        classNames="menu-secondary"
        unmountOnExit
        onEnter={calcHeight}>
        <div className="menu">
          <DropdownItem goToMenu="main" leftIcon={'hi'}>
            <h2>My Tutorial</h2>
          </DropdownItem>
          <DropdownItem leftIcon={'hi'}>HTML</DropdownItem>
          <DropdownItem leftIcon={'hi'}>CSS</DropdownItem>
          <DropdownItem leftIcon={'hi'}>JavaScript</DropdownItem>
          <DropdownItem leftIcon={'hi'}>Awesome!</DropdownItem>
        </div>
      </CSSTransition>

      <CSSTransition
        in={activeMenu === 'animals'}
        timeout={500}
        classNames="menu-secondary"
        unmountOnExit
        onEnter={calcHeight}>
        <div className="menu">
          <DropdownItem goToMenu="main" leftIcon={'hi'}>
            <h2>Animals</h2>
          </DropdownItem>
          <DropdownItem leftIcon="🦘">Kangaroo</DropdownItem>
          <DropdownItem leftIcon="🐸">Frog</DropdownItem>
          <DropdownItem leftIcon="🦋">Horse?</DropdownItem>
          <DropdownItem leftIcon="🦔">Hedgehog</DropdownItem>
        </div>
      </CSSTransition>
    </div>
  );
}

export default Navbar2;