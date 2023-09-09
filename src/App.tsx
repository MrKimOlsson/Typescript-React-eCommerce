import React, { useEffect } from 'react'
import { RouterProvider, createBrowserRouter} from 'react-router-dom';
import RootLayout from './layout/RootLayout';
import './App.css'
import { Provider, useDispatch } from 'react-redux';
import productsService, { ProductType } from './store/products/productsService';
import { setProductList } from './productsAction'; // Import the action creator
import { CartProvider } from './context/CartContext';
import store from './store/index';


// Pages
import Home from './pages/Home';
import Store from './pages/Store';
import Product from './pages/Product';
import Cart from './pages/Cart'
// import { CartProvider } from './utils/contexts/CartContext';


const App = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchAndSetProducts() {
      try {
        const productsData: ProductType[] = await productsService.fetchProducts();
        dispatch(setProductList(productsData)); // Dispatch the action with fetched products
        console.log(productsData)
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
      // errorElement: <Error />,
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
      ],
        

    },
  ]);
  // Render the RouterProvider component with the created router if authIsReady is true
  return (
    <>
      {
        <div className='app'>
          <Provider store={store}>
          <CartProvider>
          <RouterProvider router={router} />
          </CartProvider>
          </Provider>
        </div>
      }
    </>
  );
};

export default App;