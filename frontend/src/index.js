// import React from 'react';
// import ReactDOM from 'react-dom';
// import {BrowserRouter as Router} from 'react-router-dom';
// import App from './App';
// import {ProductProvider} from './components/context/context';
// //import {LoadProvider} from './components/context/LoadContext';

// ReactDOM.render(
// <ProductProvider>
// {/* <LoadProvider> */}
//     <Router>
//     <App />
//     </Router>
// {/* </LoadProvider> */}
// </ProductProvider>
// , document.getElementById('root'));


import React from 'react';
import {Provider} from 'react-redux';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom';
//import { Router} from 'react-router-dom';
import App from './App';
import store from './store/store';
//import {ProductProvider} from './components/context/context';
//import {LoadProvider} from './components/context/LoadContext';

ReactDOM.render(

<Provider store={store}>
    <Router>
    <App />
    </Router>
</Provider>

, document.getElementById('root'));