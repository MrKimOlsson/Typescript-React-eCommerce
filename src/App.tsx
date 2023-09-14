import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import RootLayout from './layout/RootLayout';
import './App.css';
import { Provider } from 'react-redux';
import { CartProvider } from './context/CartContext';
import store from './store/index'; // Import RootState

// Pages
import Home from './pages/Home';
import Store from './pages/Store';
import Product from './pages/Product';
import Cart from './pages/Cart';
import AddProduct from './pages/AddProduct';
import Checkout from './pages/Checkout';

const App = () => {

  // Create a BrowserRouter using the createBrowserRouter function
  const router = createBrowserRouter([
    {
      path: '/',
      element: <RootLayout />,
      children: [
        // Route for the home page
        {
          index: true,
          element: <Home />,
        },
        {
          path: 'store',
          element: <Store />,
        },
        {
          path: 'cart',
          element: <Cart />,
        },
        {
          path: 'product/:id',
          element: <Product />,
        },
        {
          path: 'addProduct',
          element: <AddProduct />,
        },
        {
          path: 'checkout',
          element: <Checkout />,
        },
      ],
    },
  ]);

  // Render the RouterProvider component with the created router if authIsReady is true
  return (
    <div className='app'>
      <Provider store={store}>
        <CartProvider>
          <RouterProvider router={router} />
        </CartProvider>
      </Provider>
    </div>
  );
};

export default App;
