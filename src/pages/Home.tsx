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
          <FetchProductsComponent /> {/*Fetch the products using a type guard to ensure products match the productType and dispatch it to the productList in the redux state*/}
          {productList.length > 0 ? (
            <HomeProducts products={productList} />
          ) : (
            <h4>{noProductsMessage}</h4>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;