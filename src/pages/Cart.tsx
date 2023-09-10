
import React from 'react';
import { useCart } from '../context/CartContext';
import CartComponent from '../components/CartComponent';
import { Link } from 'react-router-dom';
import FetchProductsComponent from '../components/product/FetchProductsComponent';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import LatestNews from '../components/product/LatestNews';

const Cart = () => {
  const { cart, dispatch } = useCart();

  const handleQuantityChange = (productId: string, quantityChange: number) => {
    if (quantityChange > 0) {
      dispatch({ type: 'INCREMENT_QUANTITY', payload: productId });
      console.log('Quantity incremented');
    } else if (quantityChange === -1) {
      dispatch({ type: 'DECREMENT_QUANTITY', payload: productId });
      console.log('Quantity decremented');
    }
    // Handle potential errors or edge cases here
  };

  const handleDelete = (productId: string) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: productId });
    // Handle potential errors or edge cases here
  };

    const handleCheckout = () => {
    console.log('Add checkout functionality')
    }

  let totalSum: number = 0;
  cart.items.forEach((item) => {
    totalSum += item.quantity * item.price;
  });

  const checkoutButtonText = 'Checkout'; // Use a constant for button text
  const moreProductsButtonText = 'More products'; // Use a constant for button text

  const products = useSelector((state: RootState) => state.products.productList);

  return (
    <div className='wrapper'>
      <FetchProductsComponent />
      <div className='shopingCart'>
        <h2>Shopping cart</h2>
        {cart.items.length > 0 ? (
          cart.items.map((cartItem) => (
            <CartComponent
              key={cartItem.productId}
              cartItem={cartItem}
              onQuantityChange={handleQuantityChange}
              onDelete={handleDelete}
            />
          ))
        ) : (
          <h3>Add some products</h3>
        )}
        <p>
          <strong>Total price: {totalSum}</strong>
        </p>
        <button className='button' onClick={() => handleCheckout()}>
          {checkoutButtonText}
        </button>
      </div>
      <div className='dividerDiv'>
        <h4>Latest news!</h4>
      </div>
      {products.length > 0 ? (
        <LatestNews products={products} />
      ) : (
        <h2>No products to show</h2>
      )}
      <Link to='/store'>
        <button className='button btn-moreProducts'>
          {moreProductsButtonText}
        </button>
      </Link>
    </div>
  );
};

export default Cart;