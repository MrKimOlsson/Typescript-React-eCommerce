import React, { useEffect, useState } from 'react'
import SmallCartComponent from '../SmallCartComponent'
import { FaShoppingCart } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import '../../utils/styles/cart.css'

const SmallCart = () => {
      //_____________________Cart_____________________
  // Get the cart
  const { state, dispatch } = useCart();

  const handleQuantityChange = (productId: string, quantityChange: number) => {
    // Check if quantityChange is positive or negative
    if (quantityChange > 0) {
      // If quantityChange is positive, increment the quantity
      dispatch({ type: 'INCREMENT_QUANTITY', payload: productId });
      console.log('increment');
    } else if (quantityChange === -1) {
      // If quantityChange is -1, decrement the quantity
      dispatch({ type: 'DECREMENT_QUANTITY', payload: productId });
      console.log('decrement');
    }
  };

  const handleDelete = (productId: string) => {

    dispatch({ type: 'REMOVE_CART_ITEM', payload: productId });
  };

  // For the cart checkout button.
  // Not working yet. Needs checkout functionality
  const handleCheckout = () => {
    console.log('Add checkout functionality')
  };

  // Calculate total sum
  let amountList: number[] = []
  let amount: number = 0
  let totalSum: number = 0
  state.cartItems.forEach(item => {
        amount = item.quantity * item.price
        amountList.push(amount)
  });

  if(amountList.length > 0){

    amountList.forEach(sum => {
      totalSum += sum
    });
  }

  // Check product ammount in the cart
  let productAmount: number = 0 
  if(state.cartItems){
    productAmount = state.cartItems.length
  }

  const [isCartOpen, setCartOpen] = useState(false);
  const [cartAmount, setCartAmount] = useState(0);

  useEffect(() => {
  })
  
  const openCart = () => {
    console.log('Button clicked');
    console.log('isCartOpen:', isCartOpen);
    setCartAmount(productAmount);
    setCartOpen(!isCartOpen);
    console.log('isCartOpen after click:', isCartOpen);
  };
  return (
    <div>
         {/* Cart */}

         <button className='cartButton' onClick={openCart}>
            <span id='productAmount' className={productAmount === 0 ? 'hide-amount' : ''}>
              {productAmount}
            </span>
            <span className='cartIcon'></span>
            <FaShoppingCart className='cartIcon' />
          </button>

          <div id='cartContainer' className={`cartContainer ${isCartOpen ? 'open' : ''}`}>
          
            <h2 className='smallCartTitle'>Shoping cart</h2>
            {state.cartItems.length > 0 ? (
            state.cartItems.map(cartItem => (
            <SmallCartComponent
              key={cartItem.productId}
              cartItem={cartItem}
              onQuantityChange={handleQuantityChange}
              onDelete={handleDelete}
              />
                ))
              ) : (
                <h3 className='smallCartNoProducts'>Add some products</h3>
              )}
            <div className='smallCartPriceAndButton'>
              <p><strong className='totalPrice'>Total price: {totalSum}$</strong></p>
              <Link to="./cart">
                <button className='button'>To the shoping cart</button>
              </Link>
            </div>
          </div>

    </div>
  )
}

export default SmallCart