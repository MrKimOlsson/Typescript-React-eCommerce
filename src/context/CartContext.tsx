import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';

// Define the shape of a cart item
interface CartItem {
  productId: string;
  quantity: number;
  title: string;
  imageURL: string;
  price: number;
}

// Define the shape of the cart state
interface CartState {
  items: CartItem[];
}

// Define the actions for manipulating the cart
type CartAction =
  | { type: 'ADD_TO_CART'; payload: CartItem }
  | { type: 'REMOVE_FROM_CART'; payload: string }
  | { type: 'INCREMENT_QUANTITY'; payload: string }
  | { type: 'DECREMENT_QUANTITY'; payload: string }
  | { type: 'INITIALIZE_CART'; payload: CartState };

// Create a context for the cart
const CartContext = createContext<{ cart: CartState; dispatch: React.Dispatch<CartAction> } | undefined>(
  undefined
);

// Define the cart reducer function
const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_TO_CART':
      const existingItemIndex = state.items.findIndex((item) => item.productId === action.payload.productId);

      if (existingItemIndex !== -1) {
        // If the product is already in the cart, update its quantity
        const updatedItems = [...state.items];
        updatedItems[existingItemIndex].quantity += action.payload.quantity;
        return { ...state, items: updatedItems };
      } else {
        // If the product is not in the cart, add it
        return { ...state, items: [...state.items, action.payload] };
      }

    case 'REMOVE_FROM_CART':
      // Remove a product from the cart
      const filteredItems = state.items.filter((item) => item.productId !== action.payload);
      return { ...state, items: filteredItems };

    case 'INCREMENT_QUANTITY':
      // Increment the quantity of a product in the cart
      const incrementedItems = state.items.map((item) =>
        item.productId === action.payload ? { ...item, quantity: item.quantity + 1 } : item
      );
      return { ...state, items: incrementedItems };

    case 'DECREMENT_QUANTITY':
      // Decrement the quantity of a product in the cart
      const decrementedItems = state.items.map((item) =>
        item.productId === action.payload ? { ...item, quantity: item.quantity - 1 } : item
      );
      return { ...state, items: decrementedItems };

    case 'INITIALIZE_CART':
      // Initialize the cart with stored data
      return action.payload;

    default:
      return state;
  }
};

// Create a CartProvider component to wrap the app with
export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, { items: [] });

  // Load cart data from Local Storage on initialization
  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      dispatch({ type: 'INITIALIZE_CART', payload: JSON.parse(storedCart) });
    }
  }, []);

  // Save cart data to Local Storage whenever the cart changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  return <CartContext.Provider value={{ cart, dispatch }}>{children}</CartContext.Provider>;
};

// Create a custom hook for accessing the cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};