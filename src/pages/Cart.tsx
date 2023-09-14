import React from 'react';
import { useCart } from '../context/CartContext';
import CartComponent from '../components/CartComponent';
import { Link } from 'react-router-dom';
import FetchProductsComponent from '../components/product/FetchProductsComponent';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import LatestNews from '../components/product/LatestNews';

const Cart = () => {
  const { state, dispatch } = useCart();
  const { cartItems } = state; // Access cartItems from state

  const handleQuantityChange = (productId: string, quantityChange: number) => {
    if (quantityChange > 0) {
      dispatch({ type: 'INCREMENT_QUANTITY', payload: productId });
    } else if (quantityChange === -1) {
      dispatch({ type: 'DECREMENT_QUANTITY', payload: productId });
    }
  };

  const handleDelete = (productId: string) => {
    dispatch({ type: 'REMOVE_CART_ITEM', payload: productId });
  };

  let totalSum: number = 0;
  cartItems?.forEach((item) => {
    totalSum += item.quantity * item.price;
  });

  // Button text
  const checkoutButtonText = 'Checkout';
  const moreProductsButtonText = 'More products';

  const products = useSelector((state: RootState) => state.products.productList);

  return (
    <div className='wrapper'>
      <FetchProductsComponent />
      <div className='shopingCart'>
        <h2>Shopping cart</h2>
        {cartItems.length > 0 ? (
          cartItems.map((cartItem) => (
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
          <strong className='totalPrice'>Total price: {totalSum}$</strong>
        </p>
        <Link to='/checkout'>
          <button className='button'>
            {checkoutButtonText}
          </button>
        </Link>
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