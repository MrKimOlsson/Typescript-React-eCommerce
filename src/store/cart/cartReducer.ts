import { createReducer } from '@reduxjs/toolkit';
import { addToCart } from './cartActions';

interface CartItem {
  productId: string;
  quantity: number;
}

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};


const cartReducer = createReducer(initialState, (builder) => {
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

