import { CartItem } from "../types/cartItem";
import { ProductType } from "../types/product";

const PRODUCTS_STORAGE_KEY = '@LS_PRODUCTS';
const USER_STORAGE_KEY = '@LS_USER';
const CART_STORAGE_KEY = '@LS_CART';

type StorageKey = typeof PRODUCTS_STORAGE_KEY | typeof USER_STORAGE_KEY | typeof CART_STORAGE_KEY;

const getFromLocalStorage = (key: StorageKey) => {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
}

const saveToLocalStorage = (key: StorageKey, data: any) => {
    const stringifiedData = JSON.stringify(data);

    localStorage.setItem(key, stringifiedData);
}

export const getProductsFromLocalStorage = (): ProductType[] => {
    return getFromLocalStorage(PRODUCTS_STORAGE_KEY) || [];
}

export const saveProductToLocalStorage = (threads: ProductType[]) => {
    saveToLocalStorage(PRODUCTS_STORAGE_KEY, threads);
}

export const getUserFromLocalStorage = (): User => {
    return getFromLocalStorage(USER_STORAGE_KEY) || {
        id: -1,
	    name: "John Doe",
	    userName: "anonymous"
    }
}

export const saveUserToLocalStorage = (user: User) => {
    saveToLocalStorage(USER_STORAGE_KEY, user);
}

export const getCartFromLocalStorage = (): CartItem[] => {
    return getFromLocalStorage(CART_STORAGE_KEY) || [];
}

export const saveCartToLocalStorage = (cartItems: CartItem[]) => {
    saveToLocalStorage(CART_STORAGE_KEY, cartItems);
}

export const removeFromLocalStorage = (key: StorageKey) => {
    localStorage.removeItem(key);
}

export const clearLocalStorage = () => {
    localStorage.clear();
}