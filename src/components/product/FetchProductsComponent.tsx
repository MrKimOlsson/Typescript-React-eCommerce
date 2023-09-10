import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setProductsList } from '../../store/products/productsSlice'; // Correct the import path
import productsService from '../../store/products/productsService';
import { RootState } from '../../store';

export const FetchProductsComponent: React.FC = () => {
  const productList = useSelector((state: RootState) => state.products.productList);
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchAndSetProducts() {
      try {
        const productsData: any[] = await productsService.fetchProducts(); // Use 'any' type here

        dispatch(setProductsList(productsData)); // Dispatch the action to update the Redux state
        
      } catch (error) {
        // Handle error
      }
    }

    fetchAndSetProducts();
  }, [dispatch]);

  // Use productList here, for example:
  console.log(productList); // Log the productList to the console

  return <div>{/* You can render something here if needed */}</div>;
};

export default FetchProductsComponent;
