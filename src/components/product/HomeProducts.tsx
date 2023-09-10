import React from 'react';
import ProductComponent from './ProductComponent'; // Make sure the import path is correct
import { ProductType } from '../../utils/types/product'; // Adjust the import path
import '../../utils/styles/product.css'
import { Link } from 'react-router-dom';
import LatestNews from './LatestNews';

interface ProductGridProps {
  products: ProductType[];
}

const HomeProducts: React.FC<ProductGridProps> = ({ products }: ProductGridProps) => {
  return (
    <>
    
      <div className='flex-wrap'>
      <h3 className='intro bg-black'>Welcome to <span className='shopy'>Shopy!</span></h3>
        {products[0].imageURL.length > 0 ? (
          <img className='fullwidth-img' src={products[16].imageURL[3]} alt="Product"/>
          ) : (
            <p>No image available</p>
            )}
   
            
      <div className='dividerDiv move-up'>
        <h4>Latest news!</h4>
      </div>
      <LatestNews products={products}/>
   </div>
      <Link to="/store">
      <button className='button btn-moreProducts'>More products</button>
   </Link>
    </>
        
  );
};

export default HomeProducts