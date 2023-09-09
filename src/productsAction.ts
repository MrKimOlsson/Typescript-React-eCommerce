import { ProductType } from './store/products/productsService'; // Import the appropriate type

// Define action type constants
export const SET_PRODUCTS = 'SET_PRODUCTS';

// Define action creators
export const setProductList = (productList: ProductType[]) => {
  return {
    type: SET_PRODUCTS,
    payload: productList,
  };
};