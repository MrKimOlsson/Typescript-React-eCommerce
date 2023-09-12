import React, { PropsWithChildren, createContext, useContext, useEffect, useReducer} from "react"
import { getCartFromLocalStorage } from "../utils/helpers/localStorage"

// Define the shape of a cart item
interface CartItem {
  productId: string;
  quantity: number;
  title: string;
  imageURL: string;
  price: number;
}

interface CartState {
    cartItems: CartItem[]
    hasFetched: boolean
    selectedCartItems: CartItem[]
}

 
type CartAction = 
    | { type: "SET_CART_ITEMS", payload: CartItem[] }
    | { type: "SET_SELECTED_CART_ITEMS", payload: CartItem[] }
    | { type: "CREATE_CART_ITEM", payload: CartItem }
    | { type: "REMOVE_CART_ITEM", payload: string }
    |  { type: 'INCREMENT_QUANTITY'; payload: string }
    | { type: 'DECREMENT_QUANTITY'; payload: string }


    const defaultState: CartState = {
      cartItems: [], // Initialize cartItems as an empty array
      hasFetched: false,
      selectedCartItems: []
    }
    

const cartReducer = (state:  CartState, action: CartAction): CartState => {
    switch(action.type){

        case "CREATE_CART_ITEM":
            return {
                ...state,
                cartItems: [...state.cartItems, action.payload]
            }

        case 'REMOVE_CART_ITEM':
          const filteredItems = state.cartItems.filter((item) => item.productId !== action.payload);
          return { ...state, cartItems: filteredItems };

        case "SET_CART_ITEMS":
            return {
                ...state,
                cartItems: action.payload,
                hasFetched: true
            }

        case "SET_SELECTED_CART_ITEMS":
            return {
                ...state,
                selectedCartItems: action.payload,
                hasFetched: true
            } 

        case 'INCREMENT_QUANTITY':
          // Increment the quantity of a product in the cart
          
          const incrementedItems = state.cartItems.map((item) =>
            item.productId === action.payload ? { ...item, quantity: item.quantity + 1 } : item
          );
          return { ...state, cartItems: incrementedItems };

       case 'DECREMENT_QUANTITY':
          // Decrement the quantity of a product in the cart
          
          const decrementedItems = state.cartItems.map((item) =>
            item.productId === action.payload ? { ...item, quantity: item.quantity - 1 } : item
          );
          return { ...state, cartItems: decrementedItems };

        default:
            return state
    }
}

const CartContext = createContext<{
  state: CartState;
  dispatch: React.Dispatch<CartAction>; // Corrected property name
}>({
  state: defaultState,
  dispatch: () => {}
});

const CartProvider = ({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(cartReducer, defaultState);

  useEffect(() => {
    // Fetch cart items from local storage
    const cartItemsFromLocalStorage = getCartFromLocalStorage();

    // Dispatch an action to set cart items
    dispatch({ type: "SET_CART_ITEMS", payload: cartItemsFromLocalStorage });
  }, []);

  // ...

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export {
    CartProvider,
    useCart
}

// ______________________________________________________________________________________


// import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';

// // Define the shape of a cart item
// interface CartItem {
//   productId: string;
//   quantity: number;
//   title: string;
//   imageURL: string;
//   price: number;
// }

// // Define the shape of the cart state
// interface CartState {
//   items: CartItem[];
// }

// // Define the actions for manipulating the cart
// type CartAction =
//   | { type: 'ADD_TO_CART'; payload: CartItem }
//   | { type: 'REMOVE_FROM_CART'; payload: string }
//   | { type: 'INCREMENT_QUANTITY'; payload: string }
//   | { type: 'DECREMENT_QUANTITY'; payload: string }
//   | { type: 'INITIALIZE_CART'; payload: CartState };

// // Create a context for the cart
// const CartContext = createContext<{ cart: CartState; dispatch: React.Dispatch<CartAction> } | undefined>(
//   undefined
// );

// // Define the cart reducer function
// const cartReducer = (state: CartState, action: CartAction): CartState => {
//   switch (action.type) {
//     case 'ADD_TO_CART':
//       const existingItemIndex = state.items.findIndex((item) => item.productId === action.payload.productId);

//       if (existingItemIndex !== -1) {
//         // If the product is already in the cart, update its quantity
//         const updatedItems = [...state.items];
//         updatedItems[existingItemIndex].quantity += action.payload.quantity;
//         return { ...state, items: updatedItems };
//       } else {
//         // If the product is not in the cart, add it
//         return { ...state, items: [...state.items, action.payload] };
//       }

//     case 'REMOVE_FROM_CART':
//       // Remove a product from the cart
//       const filteredItems = state.items.filter((item) => item.productId !== action.payload);
//       return { ...state, items: filteredItems };

//     case 'INCREMENT_QUANTITY':
//       // Increment the quantity of a product in the cart
//       const incrementedItems = state.items.map((item) =>
//         item.productId === action.payload ? { ...item, quantity: item.quantity + 1 } : item
//       );
//       return { ...state, items: incrementedItems };

//     case 'DECREMENT_QUANTITY':
//       // Decrement the quantity of a product in the cart
//       const decrementedItems = state.items.map((item) =>
//         item.productId === action.payload ? { ...item, quantity: item.quantity - 1 } : item
//       );
//       return { ...state, items: decrementedItems };

//     case 'INITIALIZE_CART':
//       // Initialize the cart with stored data
//       return action.payload;

//     default:
//       return state;
//   }
// };

// // Create a CartProvider component to wrap the app with
// export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
//   const [cart, dispatch] = useReducer(cartReducer, { items: [] });

//   // Load cart data from Local Storage on initialization
//   useEffect(() => {
//     const storedCart = localStorage.getItem('cart');
//     if (storedCart) {
//       dispatch({ type: 'INITIALIZE_CART', payload: JSON.parse(storedCart) });
//     }
//   }, []);

//   // Save cart data to Local Storage whenever the cart changes
//   useEffect(() => {
//     localStorage.setItem('cart', JSON.stringify(cart));
//   }, [cart]);

//   return <CartContext.Provider value={{ cart, dispatch }}>{children}</CartContext.Provider>;
// };

// // Create a custom hook for accessing the cart context
// export const useCart = () => {
//   const context = useContext(CartContext);
//   if (!context) {
//     throw new Error('useCart must be used within a CartProvider');
//   }
//   return context;
// };



// __________________________________________________________________________

// import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';

// // Define the shape of a cart item
// interface CartItem {
//   productId: string;
//   quantity: number;
//   title: string;
//   imageURL: string;
//   price: number;
// }

// // Define the shape of the cart state
// interface CartState {
//   items: CartItem[];
// }

// // Define the actions for manipulating the cart
// type CartAction =
//   | { type: 'ADD_TO_CART'; payload: CartItem }
//   | { type: 'REMOVE_FROM_CART'; payload: string }
//   | { type: 'INCREMENT_QUANTITY'; payload: string }
//   | { type: 'DECREMENT_QUANTITY'; payload: string }
//   | { type: 'INITIALIZE_CART'; payload: CartState };

// // Create a context for the cart
// const CartContext = createContext<{ cart: CartState; dispatch: React.Dispatch<CartAction> } | undefined>(
//   undefined
// );

// // Define the cart reducer function
// const cartReducer = (state: CartState, action: CartAction): CartState => {
//   switch (action.type) {
//     case 'ADD_TO_CART':
//       const existingItemIndex = state.items.findIndex((item) => item.productId === action.payload.productId);

//       if (existingItemIndex !== -1) {
//         // If the product is already in the cart, update its quantity
//         const updatedItems = [...state.items];
//         updatedItems[existingItemIndex].quantity += action.payload.quantity;
//         return { ...state, items: updatedItems };
//       } else {
//         // If the product is not in the cart, add it
//         return { ...state, items: [...state.items, action.payload] };
//       }

//     case 'REMOVE_FROM_CART':
//       // Remove a product from the cart
//       const filteredItems = state.items.filter((item) => item.productId !== action.payload);
//       return { ...state, items: filteredItems };

//     case 'INCREMENT_QUANTITY':
//       // Increment the quantity of a product in the cart
//       const incrementedItems = state.items.map((item) =>
//         item.productId === action.payload ? { ...item, quantity: item.quantity + 1 } : item
//       );
//       return { ...state, items: incrementedItems };

//     case 'DECREMENT_QUANTITY':
//       // Decrement the quantity of a product in the cart
//       const decrementedItems = state.items.map((item) =>
//         item.productId === action.payload ? { ...item, quantity: item.quantity - 1 } : item
//       );
//       return { ...state, items: decrementedItems };

//     case 'INITIALIZE_CART':
//       // Initialize the cart with stored data
//       return action.payload;

//     default:
//       return state;
//   }
// };

// // Create a CartProvider component to wrap the app with
// export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
//   const [cart, dispatch] = useReducer(cartReducer, { items: [] });

//   // Load cart data from Local Storage on initialization
//   useEffect(() => {
//     const storedCart = localStorage.getItem('cart');
//     if (storedCart) {
//       dispatch({ type: 'INITIALIZE_CART', payload: JSON.parse(storedCart) });
//     }
//   }, []);

//   // Save cart data to Local Storage whenever the cart changes
//   useEffect(() => {
//     localStorage.setItem('cart', JSON.stringify(cart));
//   }, [cart]);

//   return <CartContext.Provider value={{ cart, dispatch }}>{children}</CartContext.Provider>;
// };

// // Create a custom hook for accessing the cart context
// export const useCart = () => {
//   const context = useContext(CartContext);
//   if (!context) {
//     throw new Error('useCart must be used within a CartProvider');
//   }
//   return context;
// };