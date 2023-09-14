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