import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.scss';
import 'bootstrap/dist/js/bootstrap.js';
// import { CartProvider } from './utils/contexts/CartContext';
// import { Provider } from 'react-redux';
// import store from './store/index';

ReactDOM.render(
  <React.StrictMode>
    {/* <Provider store={store}> */}
    {/* <CartProvider> */}
        <App />
      {/* </CartProvider> */}
    {/* </Provider> */}
  </React.StrictMode>,
  document.getElementById('root')
);