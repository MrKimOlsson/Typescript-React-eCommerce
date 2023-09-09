import React from 'react';
import { ProductType } from '../../utils/types/product'; // Adjust the import path
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';


interface ProductProps {
  product: ProductType; // Use the ProductType
}

const Product: React.FC<ProductProps> = ({ product }) => {
  
  const { cart, dispatch } = useCart();
  const handleAddToCart = () => {
    // Check if the product is already in the cart
    const existingCartItemIndex = cart.items.findIndex((item) => item.productId === product.id);
  
    if (existingCartItemIndex !== -1) {
      // If the product is already in the cart, dispatch the "INCREMENT_QUANTITY" action
      dispatch({ type: 'INCREMENT_QUANTITY', payload: product.id });
    } else {
      // If the product is not in the cart, add it with a quantity of 1
      const cartItem = { productId: product.id, quantity: 1, price: product.price, title: product.title, imageURL: product.imageURL[0], };
      dispatch({ type: 'ADD_TO_CART', payload: cartItem });
    }
  };

  return (
<Link className='productCard' to={`/product/${product.id}`}>
  {product.imageURL.length > 0 ? (
    <img className='productGridImage' src={product.imageURL[0]} alt="Product" />
  ) : (
    <p>No image available</p>
  )}
  <h4 className='productTitle'>{product.title}</h4>
  <div className='row'>
    <p><strong>Price: {product.price}$</strong></p>
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
</Link>
  );
};

export default Product;