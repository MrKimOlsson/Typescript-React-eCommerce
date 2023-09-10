import { createReducer } from '@reduxjs/toolkit';
import { addToCart } from './cartActions';

// Define the shape of a cart item
interface CartItem {
  productId: string;
  quantity: number;
}

// Define the shape of the cart state
interface CartState {
  items: CartItem[];
}

// Initial state for the cart
const initialState: CartState = {
  items: [],
};

// Create a reducer using Redux Toolkit's createReducer function
const cartReducer = createReducer(initialState, (builder) => {
  // Handle the addToCart action
  builder.addCase(addToCart, (state, action) => {
    const { productId, quantity } = action.payload;
    const existingItemIndex = state.items.findIndex((item) => item.productId === productId);

    if (existingItemIndex !== -1) {
      // If the product is already in the cart, update its quantity
      state.items = state.items.map((item, index) => {
        if (index === existingItemIndex) {
          return { ...item, quantity: item.quantity + quantity };
        }
        return item;
      });
    } else {
      // If the product is not in the cart, add it (ensuring immutability)
      state.items = [...state.items, { productId, quantity }];
    }
  });
});

export default cartReducer;