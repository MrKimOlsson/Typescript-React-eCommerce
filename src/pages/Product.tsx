import React from 'react';
import SingleProductComponent from '../components/product/SingleProductComponent';

function Product() {
  return (
    <>
      <div className='wrapper'>
        <div className='content'>
          {/* Render the SingleProductComponent */}
          <SingleProductComponent />
        </div>
      </div>
    </>
  );
}

export default Product;







