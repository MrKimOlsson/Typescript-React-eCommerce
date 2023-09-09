export interface ProductType {
    category:         string,
    imageURL:         string[],
    price:            number,
    shortDescription: string,
    description:      string,
    title:            string,
    id:               string,
  }
  
  // Define the type for the Redux state
  export interface RootState {
    productList: ProductType[];
  }

