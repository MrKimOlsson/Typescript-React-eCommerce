import React, { useEffect } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import RootLayout from './layout/RootLayout';
import './App.css';
import { Provider, useDispatch } from 'react-redux';
import productsService from './store/products/productsService';
import { setProductsList} from './store/products/productsSlice';
import { CartProvider } from './context/CartContext';
import { ProductType } from './utils/types/product'
import store, { AppDispatch, RootState } from './store/index'; // Import RootState

// Pages
import Home from './pages/Home';
import Store from './pages/Store';
import Product from './pages/Product';
import Cart from './pages/Cart';
import AddProduct from './pages/AddProduct';

const App = () => {
  const dispatch = useDispatch<AppDispatch>(); // Specify AppDispatch type

  useEffect(() => {
    async function fetchAndSetProducts() {
      try {
        const productsData: ProductType[] = await productsService.fetchProducts();
        dispatch(setProductsList(productsData)); // Dispatch the action with fetched products
        console.log(productsData);
      } catch (error) {
        // Handle error
      }
    }
    fetchAndSetProducts();
  }, [dispatch]);

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
