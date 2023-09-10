import React from 'react';
import ProductGrid from '../components/product/ProductGrid';
import { useSelector } from 'react-redux';
import { RootState } from '../store/index';
import FetchProductsComponent from '../components/product/FetchProductsComponent';

const Store = () => {
  // Access productList from the Redux state
  const productList = useSelector((state: RootState) => state.products.productList);

  return (
    <>
      <div className='wrapper'>
        <div className='content'>
          {/* Call the FetchProductsComponent */}
          <FetchProductsComponent />
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