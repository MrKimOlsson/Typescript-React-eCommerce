import useDoc from '../hooks/useDoc';
import Loader from '../components/loader/Loader';
import { useParams } from 'react-router-dom';
import SingleProductComponent from '../components/product/SingleProductComponent';
// import { useCart } from '../context/CartContext';

function Product() {

  return (
    <>
      <div className='wrapper'>
        <div className='content'>
          <SingleProductComponent />
        </div>
      </div>
    </>
  );
}

export default Product;

