import React from 'react'
import { useCart } from '../../context/CartContext';
import { ProductType } from '../../utils/types/product'

interface ProductProps {
  product: ProductType;
}

const AddToCartFunctions: React.FC<ProductProps> = ({ product }: ProductProps) => {
  const { cart, dispatch } = useCart();

  const handleAddToCart = () => {
    // Check if the product is already in the cart
    const existingCartItemIndex = cart.items.findIndex((item) => item.productId === product.id);
  
    if (existingCartItemIndex !== -1) {
      // If the product is already in the cart, dispatch the "INCREMENT_QUANTITY" action
      dispatch({ type: 'INCREMENT_QUANTITY', payload: product.id });
    } else {
      // If the product is not in the cart, add it with a quantity of 1
      const cartItem = { productId: product.id, quantity: 1, price: product.price, title: product.title, imageURL: product.imageURL[0] };
      dispatch({ type: 'ADD_TO_CART', payload: cartItem });
    }
  };

  return (
    <div>
        <button
          id='btn-addToCart'
          className='button'
          onClick={(e) => {
            // Prevent the link from being activated
            e.preventDefault();
            // Handle adding to cart
            handleAddToCart();
          }}
        >
          Add to Cart
        </button>
    </div>
  )
}

export default AddToCartFunctions