import { combineReducers } from 'redux';
import productsReducer from './products/productsSlice';

const rootReducer = combineReducers({
  products: productsReducer,
  // Add other reducers here
});

export default rootReducer;
