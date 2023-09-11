import { CartItem } from "../types/cartItem";

const CART_STORAGE_KEY = '@LS_CART';

type StorageKey = typeof CART_STORAGE_KEY;

const getFromLocalStorage = <T>(key: StorageKey): T | null => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error(`Error while parsing data from ${key}:`, error);
    return null;
  }
};

const saveToLocalStorage = <T>(key: StorageKey, data: T) => {
  try {
    const stringifiedData = JSON.stringify(data);
    localStorage.setItem(key, stringifiedData);
  } catch (error) {
    console.error(`Error while saving data to ${key}:`, error);
  }
};

export const getCartFromLocalStorage = (): CartItem[] => {
  return getFromLocalStorage<CartItem[]>(CART_STORAGE_KEY) || [];
};

export const saveCartToLocalStorage = (cartItems: CartItem[]) => {
  saveToLocalStorage(CART_STORAGE_KEY, cartItems);
};

export const removeFromLocalStorage = (key: StorageKey) => {
  localStorage.removeItem(key);
};

export const clearLocalStorage = () => {
  localStorage.clear();
};







// const PRODUCTS_STORAGE_KEY = '@LS_PRODUCTS';
// const USER_STORAGE_KEY = '@LS_USER';
// const CART_STORAGE_KEY = '@LS_CART';


// //_________________________PRODUCTS_________________________

// // export const getProductsFromLocalStorage = (): ProductType[] => {
// //     return getFromLocalStorage(PRODUCTS_STORAGE_KEY) || [];
// // }

// // export const saveProductToLocalStorage = (threads: ProductType[]) => {
// //     saveToLocalStorage(PRODUCTS_STORAGE_KEY, threads);
// // }

// //_________________________USER_________________________

// // export const getUserFromLocalStorage = (): User => {
// //     return getFromLocalStorage(USER_STORAGE_KEY) || {
// //         id: -1,
// // 	    name: "John Doe",
// // 	    userName: "anonymous"
// //     }
// // }

// // export const saveUserToLocalStorage = (user: User) => {
// //     saveToLocalStorage(USER_STORAGE_KEY, user);
// // }

