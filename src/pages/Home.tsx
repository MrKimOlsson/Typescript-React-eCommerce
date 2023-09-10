import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/index';
import FetchProductsComponent from '../components/product/FetchProductsComponent';
import HomeProducts from '../components/product/HomeProducts';

const Home = () => {
  // Access productList from the Redux state
  const productList = useSelector((state: RootState) => state.products.productList);

  // Define a constant for the "No products to show" message
  const noProductsMessage = 'No products to show';

  return (
    <>
      <div className='wrapper'>
        <div className='content'>
          <FetchProductsComponent /> {/* Call the FetchProductsComponent */}
          {productList.length > 0 ? (
            <HomeProducts products={productList} />
          ) : (
            <h2>{noProductsMessage}</h2>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;