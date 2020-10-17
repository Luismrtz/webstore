import React from "react";
import {Switch,Route} from 'react-router-dom';
import './App.module.scss';

import { Navbar4, Cart, Details, Profile, ProductList, ProductList2, ProductAll, Default, MainPage, Signin, Register, PushProducts, Shipping, PaymentPage, PlaceOrder, Order, OrderMenu} from './components/index';


export default () => {
    return (
        <div >
            <Navbar4 />
            
            <Switch>
            <Route exact path="/" component={MainPage}/>
                <Route path="/signin" component={Signin} />
                <Route path="/register" component={Register} />
                <Route path="/shop/products" component={ProductList}/>
                <Route path="/ordermenu" component={OrderMenu}/>
                <Route path="/profile" component={Profile}/>
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