import { db } from "../../firebase/config"
import { collection, getDocs, doc, setDoc, DocumentData } from 'firebase/firestore'

export interface ProductType {
  category: string;
  imageURL: string[];
  price: number;
  shortDescription: string;
  description: string;
  title: string;
  id: string;
}

// Function to fetch products from Firestore
async function fetchProducts(): Promise<ProductType[]> {
  try {
    const ProductsCollectionRef = collection(db, 'products');
    const productsSnapshot = await getDocs(ProductsCollectionRef);
    const products: ProductType[] = [];

    productsSnapshot.forEach((doc) => {
      // Cast the document data to the ProductType interface
      const productData = doc.data() as ProductType;
      products.push(productData);
    });

    return products;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

// Function to add a product to Firestore
export async function addProduct(product: ProductType): Promise<void> {
  try {
    const productRef = doc(db, "products", product.id.toString());
    
    // Set the document data with the product information
    await setDoc(productRef, product);
    
    console.log("New product created with ID:", product.id);
  } catch (error) {
    console.error("Error adding product:", error);
  }
}

// Export the product service functions
const productService = {
  addProduct,
  fetchProducts
}

export default productService;