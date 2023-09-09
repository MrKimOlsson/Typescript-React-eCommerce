import React, { useEffect, useState } from 'react';
// import { ProductType } from '../store/products/productsService';
import { useSelector } from 'react-redux';
import { RootState } from '../store/index';
import FetchProductsComponent from '../components/product/FetchProductsComponent';


// export let products: ProductType[] = []
const Home = () => {
  
  <FetchProductsComponent /> 
  const productList = useSelector((state: RootState) => state.products.productList);
  console.log(productList)
  return (
    <div className='wrapper'>
      <h2>Welcome to Shopy!</h2>
      <div className='content'>
        <div className='fullwidth-img'>
        {/* <img className='' src={productList[0].imageURL[0]} alt="Product"/> */}
          
        </div>
      </div>
    </div>
  )
}

export default Home