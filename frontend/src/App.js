import React, { useState } from "react";
import {Switch,Route} from 'react-router-dom';
import './App.module.scss';

import { Navbar, Cart, Details, ProductList, Default } from './components/index';

export default () => {
    return (
        <div >
            <Navbar />
            
            <Switch>
                <Route exact path="/" component={ProductList}/>
                <Route path="/details/:id" component={Details}/>
                <Route exact path="/cart/:id?" component={Cart}/>
                <Route component={Default}/>
                
            </Switch>
        </div>
    )
}