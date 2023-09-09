import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setProductsList } from '../../store/products/productsSlice'; // Correct the import path
import productsService from '../../store/products/productsService';
import { ProductType } from '../../utils/types/product';
import { RootState } from '../../store';


export const FetchProductsComponent = () => {
  // const productList = useSelector((state: RootState) => state.products.productList); // Access productList from the Redux state
  const dispatch = useDispatch(); // Get the dispatch function

  useEffect(() => {
    async function fetchAndSetProducts() {
      try {
        const productsData = await productsService.fetchProducts(); // Assuming this returns an array of products

        dispatch(setProductsList(productsData)); // Dispatch the action to update the Redux state
        
      } catch (error) {
        // Handle error
      }
    }

    fetchAndSetProducts();
  }, [dispatch]);

  return <div>{/* You can render something here if needed */}</div>;
};

export default FetchProductsComponent;