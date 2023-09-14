import React from 'react';
import '../utils/styles/cart.css';

interface CartComponentProps {
  cartItem: CartItem;
  onQuantityChange: (productId: string, quantity: number) => void;
  onDelete: (productId: string) => void;
}
const CartComponent: React.FC<CartComponentProps> = ({ cartItem, onQuantityChange, onDelete }) => {
  
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
    <div className='card'>
      {cartItem.imageURL.length > 0 ? (
        <img className='cartProductImage' src={cartItem.imageURL} alt="Product" />
      ) : (
        <p>No image available</p>
      )}
      <p className='cartItemTitle'><strong>{cartItem.title}</strong></p>
      <div className="quantity-control">
        <button className='btn-quantity' onClick={handleDecrementQuantity}>-</button>
        <p>{cartItem.quantity}</p>
        <button className='btn-quantity' onClick={handleIncrementQuantity}>+</button>
      </div>
      <button className='button' onClick={() => onDelete(cartItem.productId)}>Delete</button>
    </div>
  );
};

export default CartComponent;