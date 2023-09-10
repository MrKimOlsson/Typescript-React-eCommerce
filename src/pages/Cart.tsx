import React from 'react';
import { useCart } from '../context/CartContext';
import CartComponent from '../components/CartComponent';
import LatestNews from '../components/product/LatestNews';
import { Link } from 'react-router-dom';
import FetchProductsComponent from '../components/product/FetchProductsComponent';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

const Cart = () => {
  const { cart, dispatch } = useCart();
  console.log(cart);

  const handleQuantityChange = (productId: string, quantityChange: number) => {
    // Check if quantityChange is positive or negative
    if (quantityChange > 0) {
      // If quantityChange is positive, increment the quantity
      dispatch({ type: 'INCREMENT_QUANTITY', payload: productId });
      console.log('increment');
    } else if (quantityChange === -1) {
      // If quantityChange is -1, decrement the quantity
      dispatch({ type: 'DECREMENT_QUANTITY', payload: productId });
      console.log('decrement');
    }
  };

  const handleDelete = (productId: string) => {

    dispatch({ type: 'REMOVE_FROM_CART', payload: productId });
  };

  const handleCheckout = () => {
    console.log('Add checkout functionality')
    
  };


  let ammountList: number[] = []
  let ammount: number = 0
  let totalSum: number = 0
  cart.items.forEach(item => {
        ammount = item.quantity * item.price
        ammountList.push(ammount)
  });

  if(ammountList.length > 0){

    ammountList.forEach(sum => {
      totalSum += sum
    });
  }
  const productList = useSelector((state: RootState) => state.products.productList);
  return (
    <div className='wrapper'>
      
      <FetchProductsComponent /> 
      <div className='shopingCart'>
        <h2>Shopping cart</h2>
        {cart.items.length > 0 ? (
          cart.items.map(cartItem => (
            <CartComponent
              key={cartItem.productId}
              cartItem={cartItem}
              onQuantityChange={handleQuantityChange}
              onDelete={handleDelete}
            
            />
          ))
        ) : (
          <h2>No products to show</h2>
        )}
        <p><strong>Total price: {totalSum}</strong></p>
        <button className='button' onClick={() => handleCheckout()}>Checkout</button>
      </div>
      <div className='dividerDiv'>
        <h4>Latest news!</h4>
      </div>
      <LatestNews productList={productList}/>
      <Link to="/store">
        <button className='button btn-moreProducts'>More products</button>
      </Link>
    </div>
  );
};

export default Cart;

// import React from 'react';
// import { useCart } from '../context/CartContext';
// import CartComponent from '../components/shoppingCart/CartComponent';

// const Cart = () => {
//   const { cart } = useCart();
//   console.log(cart);

//   return (
//     <>
    
//    <div className='wrapper'>
//       <h2>Shopping cart</h2>
//       {/* <div className='content'> */}
//         {cart.items.length > 0 ? (
//           cart.items.map(cartItem => (
//             <CartComponent key={cartItem.productId} cartItem={cartItem} />
//           ))
//         ) : (
//           <h2>No products to show</h2>
//         )}
//       {/* </div> */}
//     </div>
    
//     </>
//   );
// };

// export default Cart;