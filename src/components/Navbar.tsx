import React, { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import Logo from '../assets/logo.png'
import '../utils/styles/navbar.css'
import '../utils/styles/cart.css'
import { useCart } from '../context/CartContext';
import SmallCartComponent from './SmallCartComponent';
import { FaShoppingCart } from 'react-icons/fa';


const Navbar = () => {

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

    //_____________________Navbar_____________________

    useEffect(() => {
      const navbar = document.querySelector(".navbar");
      const menuItems = document.querySelectorAll(".menuItem");
      const hamburger = document.querySelector(".hamburger");
    
      const toggleMenu = () => {
        navbar?.classList.toggle("change");
        navbar?.classList.toggle("showMenu");
    };

    menuItems.forEach((menuItem) => {
      menuItem.addEventListener("click", toggleMenu);
    });

    hamburger?.addEventListener("click", toggleMenu);

    return () => {
      menuItems.forEach((menuItem) => {
        menuItem.removeEventListener("click", toggleMenu);
      });

      hamburger?.removeEventListener("click", toggleMenu);
    };
  }, []);


  return (
    <>
     <nav className='navbar'>
        <menu className="menu-desktop">
          <Link to='/' ><img src={Logo} alt="KimOlsson.se" className="link logo-img"/></Link>
          <li><NavLink className='nav-link' to='/'>Home</NavLink></li>
          <li><NavLink className='nav-link' to='/store'>Store</NavLink></li>
          <li><NavLink className='nav-link' to='/cart'>Cart</NavLink></li>
          <li><NavLink className='nav-link' to='/addProduct'>Add products</NavLink></li>
          
          {/* Cart */}

          <button className='cartButton' onClick={openCart}>
            <span id='productAmount' className={productAmount === 0 ? 'hide-amount' : ''}>
              {productAmount}
            </span>
            <span className='cartIcon'></span>
            <FaShoppingCart className='cartIcon' />
          </button>

          <div
            id='cartContainer'
            className={`cartContainer ${isCartOpen ? 'open' : ''}`}
            style={{ right: isCartOpen ? '0' : '-300px' }}
          >
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
              <p><strong>Total price: {totalSum}$</strong></p>
              <Link to="./cart">
                <button className='button'>To the shoping cart</button>
              </Link>
            </div>
          </div>
        </menu>

        {/*-- Hidden menu --*/}
        <menu className="menuMobile">
          <li><NavLink className="menuItem" to="/">Home</NavLink></li>
          <li><NavLink className="menuItem" to='/store'>Store</NavLink></li>
          <li><NavLink className="menuItem" to='/cart'>Cart</NavLink></li>
          <li><NavLink className="menuItem" to='/addProduct'>Add products</NavLink></li>
        </menu>

        {/*-- Hamburger --*/}
        <div>
          <Link to='/' ><img src={Logo} alt="Shopy" className="link logo-img-mobile"/></Link>
          <Link to='/' ><img src={Logo} alt="Shopy" className="menu-logo logo-img"/></Link>
        </div>
        <div className="hamburger">
          <div className="bar1"></div>
          <div className="bar2"></div>
          <div className="bar3"></div>
        </div>
        
      </nav>
    </>
  )
}

export default Navbar