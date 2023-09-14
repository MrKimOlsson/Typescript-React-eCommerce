import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setProductsList } from '../../store/products/productsSlice'; // Correct the import path
import productsService from '../../store/products/productsService';

export const FetchProductsComponent: React.FC = () => {
  // const productList = useSelector((state: RootState) => state.products.productList);
  const dispatch = useDispatch();
    
    // Define a type guard to check if an object matches the ProductType interface
    function isProductType(obj: any): obj is ProductType {
      return (
        typeof obj === 'object' &&
        typeof obj.price === 'number' &&
        typeof obj.title === 'string' &&
        typeof obj.id === 'string' &&
        typeof obj.category === 'string' &&
        typeof obj.shortDescription === 'string' &&
        typeof obj.description === 'string'
        // Add other property checks as needed
      );
    }
    
      useEffect(() => {
        async function fetchAndSetProducts() {
          try {
            // first version:
            // const productsData: ProductType[] = await productsService.fetchProducts();
            // ProductType[] vs any?

            const rawData: any = await productsService.fetchProducts(); // Replace this with your actual Firebase data retrieval
    
            if (Array.isArray(rawData)) {
              // Filter and extract valid ProductType objects using the type guard
              const validProducts: ProductType[] = rawData.filter(isProductType);
    
              if (validProducts.length > 0) {
                // You have an array of valid ProductType objects
                console.log(validProducts);
           
                dispatch(setProductsList(validProducts)); // Dispatch the action with fetched and valid products
              } else {
                // Handle the case where no valid ProductType objects were found
                console.error('No valid ProductType objects found in Firebase data');
              }
            } else {
              // Handle the case where rawData is not an array
              console.error('Invalid Firebase data format');
            }

          } catch (error) {

          }
        }
        fetchAndSetProducts();
      }, [dispatch]);
    

      // OLD fetch

  //   async function fetchAndSetProducts() {
  //     try {
  //       const productsData: any[] = await productsService.fetchProducts(); // Use 'any' type here

  //       dispatch(setProductsList(productsData)); // Dispatch the action to update the Redux state
        
  //     } catch (error) {
  //       // Handle error
  //     }
  //   }

  //   fetchAndSetProducts();
  // }, [dispatch]);

  // Use productList here, for example:
  // console.log(productList); // Log the productList to the console

  return <div></div>;
};

export default FetchProductsComponent;
