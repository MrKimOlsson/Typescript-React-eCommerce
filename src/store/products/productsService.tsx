import { db } from "../../firebase/config"
import { collection, getDocs, doc, setDoc } from 'firebase/firestore'
// import { Product as ProductType } from '../../types'; // Adjust the import path

export interface ProductType {
  category:         string,
  imageURL:         string[],
  price:            number,
  shortDescription: string,
  description:      string,
  title:            string,
  id:               string,
}

async function fetchProducts(): Promise<ProductType[]> {
  try {
    const ProductsCollectionRef = collection(db, 'products');
    const productsSnapshot = await getDocs(ProductsCollectionRef);
    const products: ProductType[] = [];
    productsSnapshot.forEach((doc) => {
      products.push(doc.data() as ProductType);
    });

    return products;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}


export async function addProducts(product: ProductType): Promise<void> {
  try {

    const threadRef = doc(db, "products", product.id.toString());
    await setDoc(threadRef, product);
    console.log("Ny tråd skapad med ID:", product.id);
  } catch (error) {
    console.error("Fel vid tillägg av tråd:", error);
  }
}

// const getAllAsync = async (col: string) => {
//   const colRef = collection(db, col)
//   const querySnapshot = await getDocs(colRef)

//   const products: ProductType[] = []
//     querySnapshot.forEach((doc: DocumentSnapshot) => {
//     products.push({...doc.data() } as ProductType);
//   })

//   return products
// }

// export { fetchProducts }

const productsService = {
  addProducts,
  // getAllAsync,
  fetchProducts
}

export default productsService