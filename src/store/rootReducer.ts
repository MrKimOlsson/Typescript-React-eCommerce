import { combineReducers } from 'redux';
import productsReducer from './products/productsSlice';
// import cartReducer from './cart/cartReducer';
// import {cartReducer} from '../utils/contexts/CartContext'
// Import other reducers if needed

const rootReducer = combineReducers({
  products: productsReducer,
  // cart: cartReducer,
  
  // Add other reducers here
});

export default rootReducer;
