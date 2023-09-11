import useDoc from '../../hooks/useDoc';
import Loader from '../../components/loader/Loader';
import { useParams } from 'react-router-dom';
import '../../utils/styles/product.css'
import { useCart } from '../../context/CartContext';

function SingleProductComponent() {

  const { id } = useParams();

  const { state, dispatch } = useCart();
  const { cartItems } = state; // Access cartItems from state

  const { data: product, error, loading } = useDoc('products', id || '');
  if (id === undefined) {
    return <p>Product ID is missing</p>;
  }

  if (!product) {
    return (
      <div>
        {loading && <Loader />}
        {error && <p>{error}</p>}
      </div>
    );
  }
  let existingCartItemIndex: number | string = ""
  const handleAddToCart = () => {
    // Check if the product is already in the cart
    cartItems.length > 0 && (
      existingCartItemIndex = cartItems.findIndex((item) => item.productId === product.id)
      )
    
      if (existingCartItemIndex !== -1) {
        // If the product is already in the cart, dispatch the "INCREMENT_QUANTITY" action
        dispatch({ type: 'INCREMENT_QUANTITY', payload: product.id });
      } else {
        // If the product is not in the cart, add it with a quantity of 1
        const cartItem = { productId: product.id, quantity: 1, price: product.price, title: product.title, imageURL: product.imageURL[0], };
        dispatch({ type: 'CREATE_CART_ITEM', payload: cartItem });
      }
  };

  return (
    <>
      <h3>{product.title}</h3>
      <div className='flexRow'>
        <div className='singleProductText'>
            <h4>{product.shortDescription}</h4>
            <p>{product.description}</p>
            <p><b>Price: {product.price}</b></p>
            <button onClick={() => handleAddToCart()}>Add to Cart</button>
        </div>

        {product.imageURL.length > 0 ? (
          <img className='productImage' src={product.imageURL[0]} alt="Product"/>
          ) : (
            <p>No image available</p>
            )}
      </div>
    
    <div className='productImages'>

      {/* Loop the through all the images instead? */}
      
      {product.imageURL.length > 0 ? (
        <img className='productImage' src={product.imageURL[1]} alt="Product"/>
        ) : (
          <p>No image available</p>
          )}
      {product.imageURL.length > 0 ? (
        <img className='productImage' src={product.imageURL[2]} alt="Product"/>
        ) : (
          <p>No image available</p>
          )}
      {product.imageURL.length > 0 ? (
        <img className='productImage' src={product.imageURL[3]} alt="Product"/>
        ) : (
          <p>No image available</p>
          )}
      {product.imageURL.length > 0 ? (
        <img className='productImage' src={product.imageURL[4]} alt="Product"/>
        ) : (
          <p>No image available</p>
          )}
      </div>
    </>
  );
}

export default SingleProductComponent;