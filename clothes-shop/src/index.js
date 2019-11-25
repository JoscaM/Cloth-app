import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router , Route }from 'react-router-dom';
import App from './App';
import ShoeList from './components/shoe/shoe.js';
import AddItem from './components/additem';
import ShoppingCart from './components/header/ShoppingCart.js';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <Router>
    <div>
      <Route path ='/' exact component={App} />
      <Route path ='/Shoe'  component={ShoeList} />
      <Route path = '/additem' component={AddItem} />
      <Route path = '/shoppingcart' component={ShoppingCart} />
    </div>
  </Router>
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
