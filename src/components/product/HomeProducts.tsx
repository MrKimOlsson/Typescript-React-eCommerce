import React from 'react';
import '../../utils/styles/product.css';
import { Link } from 'react-router-dom';
import LatestNews from './LatestNews';

interface ProductGridProps {
  products: ProductType[];
}

const HomeProducts: React.FC<ProductGridProps> = ({ products }: ProductGridProps) => {
  // Check if there are products and if the first product has imageURLs
  const hasProducts = products && products.length > 0;
  const hasImageURLs = hasProducts && products[0].imageURL && products[0].imageURL.length > 0;

  // Use optional chaining to safely access imageURLs
  const imageURL = hasImageURLs ? products[10]?.imageURL?.[2] : undefined; // Change null to undefined

  return (
    <>
      <div className='flex-wrap'>
        <h3 className='intro bg-black'>Welcome to <span className='shopy'>Shopy!</span></h3>
        {hasImageURLs ? (
          <img className='fullwidth-img' src={imageURL ?? ''} alt="Product" /> // Use nullish coalescing operator
        ) : (
          <p>No image available</p>
        )}

        <div className='dividerDiv move-up'>
          <h4>Latest news!</h4>
        </div>
        <LatestNews products={products} />
      </div>
      <Link to="/store">
        <button className='button btn-moreProducts'>More products</button>
      </Link>
    </>
  );
};

export default HomeProducts;
