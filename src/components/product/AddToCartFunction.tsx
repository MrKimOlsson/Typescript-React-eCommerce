import React, { useEffect, } from 'react';
import { useCart } from '../../context/CartContext';
import { ProductType } from '../../utils/types/product';
import { saveCartToLocalStorage } from '../../utils/helpers/localStorage';

interface ProductProps {
  product: ProductType;
}

const AddToCartFunctions: React.FC<ProductProps> = ({ product }) => {
  // const { state, dispatch } = useCart();
  // const { cartItems } = state; // Access cartItems from state
  const { state, dispatch } = useCart();
  const cartItemsArray = state.cartItems;
  

  const handleAddToCart = () => {

    // Check if the product is already in the cart
    // if (Array.isArray(cartItemsArray)) {
    const existingCartItemIndex = cartItemsArray.findIndex((item) => item.productId === product.id);
    
    if (existingCartItemIndex !== -1) {
      // If the product is already in the cart, dispatch the "INCREMENT_QUANTITY" action
      dispatch({ type: 'INCREMENT_QUANTITY', payload: product.id });
    } else {
      // If the product is not in the cart, add it with a quantity of 1
      const cartItem = {
        productId: product.id,
        quantity: 1,
        price: product.price,
        title: product.title,
        imageURL: product.imageURL[0],
      };
      dispatch({ type: 'CREATE_CART_ITEM', payload: cartItem });
    
  };
}

  // Use useEffect to update local storage when cartItems change
  useEffect(() => {
    // Save the updated cart to local storage
    saveCartToLocalStorage(cartItemsArray);
  }, [cartItemsArray]);

  return (
    <div>
      <button
        id='btn-addToCart'
        className='button'
        onClick={(e) => {
          e.preventDefault();
          handleAddToCart();
        }}
      >
        Add to Cart
      </button>
    </div>
  );
};

export default AddToCartFunctions;