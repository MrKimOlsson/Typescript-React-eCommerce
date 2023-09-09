import React, { useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
// import { useShoppingCart } from "../../context/CartContext"
import { Button, Container, Nav, Navbar as NavbarBs } from "react-bootstrap"
import Logo from '../../assets/logo.png'
import './navbar.css'

const Navbar = () => {
  // const { openCart, cartQuantity } = useShoppingCart()
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
              {/* <li><NavLink className='nav-link' to='/details'>Details</NavLink></li> */}
              <li><NavLink className='nav-link' to='/cart'>Cart</NavLink></li>
              
              {/* {cartQuantity > 0 && (
              <button className='circle' onClick={openCart}>{cartQuantity}</button>
              )} */}

            </menu>

   
            {/*-- Hidden menu --*/}
            <menu className="menuMobile">
                <li><NavLink className="menuItem" to="/">Home</NavLink></li>
                <li><NavLink className="menuItem" to='/store'>Store</NavLink></li>
                <li><NavLink className="menuItem" to='/details'>Details</NavLink></li>
                <li><NavLink className="menuItem" to='/cart'>Cart</NavLink></li>
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