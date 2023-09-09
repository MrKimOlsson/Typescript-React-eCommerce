import { db } from "../../firebase/config"
import { addDoc, collection, getDocs, DocumentSnapshot } from 'firebase/firestore'
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

const createProduct = async (productData: any) => {
  const collectionRef = collection(db, 'products')
  const docRef = await addDoc(collectionRef, productData)

  if(!docRef.id) throw new Error('Something went wrong')

  console.log(docRef)
  return {id: docRef.id, ...productData}

}

const getAllAsync = async (col: string) => {
  const colRef = collection(db, col)
  const querySnapshot = await getDocs(colRef)

  const products: ProductType[] = []
    querySnapshot.forEach((doc: DocumentSnapshot) => {
    products.push({...doc.data() } as ProductType);
  })

  return products
}

// export { fetchProducts }

const productsService = {
  createProduct,
  getAllAsync,
  fetchProducts
}

export default productsService