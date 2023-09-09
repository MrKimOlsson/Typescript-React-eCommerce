import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import Logo from '../../assets/logo.png'
import './footer.css'

const Footer = () => {


  return (
    <>
    <footer>

      <div className='center'>
        <Link to='/' ><img src={Logo} alt="Shopy" /></Link>
      </div>  
        <div>
          <ul className="footer-menu">
              <li><NavLink className='nav-link' to='/'>Home</NavLink></li>
              <li><NavLink className='nav-link' to='/products'>Products</NavLink></li>
              <li><NavLink className='nav-link' to='/details'>Details</NavLink></li>
              <li><NavLink className='nav-link' to='/cart'>Cart</NavLink></li>
          </ul>
        </div>
      <div>
        <p className="copyright"><i>&#169; Kim Olsson 2023 - Typescript-React-eCommerce - All rights reserved</i></p>                  
      </div>
    
    </footer>
    </>
  )
}

export default Footer