import React from 'react';
import { CartItem } from '../utils/types/cartItem';
import '../utils/styles/cart.css';
import { Link } from 'react-router-dom';

interface CartComponentProps {
  cartItem: CartItem;
  onQuantityChange: (productId: string, quantity: number) => void;
  onDelete: (productId: string) => void;
}

const SmallCartComponent: React.FC<CartComponentProps> = ({ cartItem, onQuantityChange, onDelete }) => {
  
  const handleIncrementQuantity = () => {
    // Call the onQuantityChange prop to increment the quantity
    onQuantityChange(cartItem.productId, cartItem.quantity);
  };

  const handleDecrementQuantity = () => {
    // Call the onQuantityChange prop to decrement the quantity
    if (cartItem.quantity > 1) {
      onQuantityChange(cartItem.productId, -1);
    }
  };

  return (
    <>
    <div className='smallCartWrapper'>
      <p className='smallCartItemTitle'><strong>{cartItem.title}</strong></p>
      <div className='smallCartProductList'>
        {cartItem.imageURL.length > 0 ? (
          <img className='smallCartProductImage' src={cartItem.imageURL} alt="Product" />
        ) : (
          <p>No image available</p>
        )}
        <div className="quantity-control">
          <button className='btn-quantity' onClick={handleDecrementQuantity}>-</button>
          <p>{cartItem.quantity}</p>
          <button className='btn-quantity' onClick={handleIncrementQuantity}>+</button>
        </div>
        <button className='button' onClick={() => onDelete(cartItem.productId)}>Delete</button>
      </div>
    </div>
    </>
  );
};

export default SmallCartComponent;