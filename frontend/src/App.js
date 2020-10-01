import React, { useState } from "react";
import {Switch,Route} from 'react-router-dom';
import './App.module.scss';

import { Navbar4, Cart, Details, ProductList, ProductList2, ProductAll, Default, MainPage, Signin, Register, PushProducts, Shipping, PaymentPage, PlaceOrder, Order } from './components/index';


//import Navbar2 from "./components/Navbar/Navbar2";

export default () => {
    return (
        <div >
            <Navbar4 />
            
            <Switch>
            <Route exact path="/" component={MainPage}/>
                <Route path="/signin" component={Signin} />
                <Route path="/register" component={Register} />
                <Route path="/shop/products" component={ProductList}/>
                <Route path="/shipping" component={Shipping}/>
                <Route path="/payment" component={PaymentPage}/>
                <Route path="/placeorder" component={PlaceOrder}/>
                <Route path="/order/:id" component={Order}/>
                <Route path="/pushItems" component={PushProducts} />
                <Route path="/shop/accessories" component={ProductList2}/>
                <Route exact path="/shop" component={ProductAll}/>
                <Route path="/details/:id" component={Details}/>
                <Route exact path="/cart/:id?" component={Cart}/>
                <Route component={Default}/>
                
            </Switch>
            
        </div>
    )
}