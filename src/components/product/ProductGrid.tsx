import React from 'react';
import ProductComponent from './ProductComponent'; // Make sure the import path is correct
import '../../utils/styles/product.css'

interface ProductGridProps {
  products: ProductType[];
}

const ProductGrid: React.FC<ProductGridProps> = ({ products }: ProductGridProps) => {
  return (
      <div className='flex-wrap'>
        {products.length > 0 ? (
          products.map(product => <ProductComponent key={product.id} product={product} />)
        ) : (
          <h2>No products to show</h2>
        )}
      </div>
  );
};

export default ProductGrid;
