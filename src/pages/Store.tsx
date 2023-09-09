import React from 'react';
import ProductGrid from '../components/product/ProductGrid';
import { useSelector } from 'react-redux';
import { RootState } from '../store/index';
import FetchProductsComponent from '../components/product/FetchProductsComponent';

const Store = () => {
  const productList = useSelector((state: RootState) => state.products.productList); // Access productList from the Redux state

  return (
    <>
      <div className='wrapper'>
        <h2>Products</h2>
        <div className='content'>
          <FetchProductsComponent /> {/* Call the FetchProductsComponent */}
          {productList.length > 0 ? (
            <ProductGrid products={productList} />
          ) : (
            <h2>No products to show</h2>
          )}
        </div>
      </div>
    </>
  );
};

export default Store;