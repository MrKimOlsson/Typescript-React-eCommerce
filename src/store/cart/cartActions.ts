import { createAction } from '@reduxjs/toolkit';

// Define the action type
export const addToCart = createAction<{ productId: string; quantity: number }>('cart/addToCart');