import React from 'react';
import { Link } from 'react-router-dom';
import { ProductType } from '../../utils/types/product';
import AddToCartFunctions from './AddToCartFunction'; // Correct the import if necessary

interface ProductProps {
  product: ProductType;
}

const Product: React.FC<ProductProps> = ({ product }) => {
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
        <AddToCartFunctions product={product} />
      </div>
    </Link>
  );
};

export default Product;