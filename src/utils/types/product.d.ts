interface ProductType {
    category:         string,
    imageURL:         string[],
    price:            number,
    shortDescription: string,
    description:      string,
    title:            string,
    id:               string,
  }
  
  // Define the type for the Redux state
  interface RootState {
    productList: ProductType[];
  }

  interface Footwear extends ProductType {
    shoesize: string,
  }

  interface Hoodie extends ProductType {
    size: string,
  }




