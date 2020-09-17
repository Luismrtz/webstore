import React, { useState } from "react";
import {Switch,Route} from 'react-router-dom';
import './App.module.scss';

import { Navbar4, Cart, Details, ProductList, ProductList2, ProductAll, Default, MainPage,  } from './components/index';
//import Navbar2 from "./components/Navbar/Navbar2";

export default () => {
    return (
        <div >
            <Navbar4 />
            
            <Switch>
            <Route exact path="/" component={MainPage}/>
                <Route path="/shop/products" component={ProductList}/>
                <Route path="/shop/accessories" component={ProductList2}/>
                <Route exact path="/shop" component={ProductAll}/>
                <Route path="/details/:id" component={Details}/>
                <Route exact path="/cart/:id?" component={Cart}/>
                <Route component={Default}/>
                
            </Switch>
            
        </div>
    )
}