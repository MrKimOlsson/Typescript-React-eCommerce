import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/index';
import FetchProductsComponent from '../components/product/FetchProductsComponent';
import { Link } from 'react-router-dom';
import LatestNews from '../components/product/LatestNews';
import ProductGrid from '../components/product/ProductGrid';
import HomeProducts from '../components/product/HomeProducts';


// export let products: ProductType[] = []
const Home = () => {

  const productList = useSelector((state: RootState) => state.products.productList); // Access productList from the Redux state

  return (
    <>
      <div className='wrapper'>
        <div className='content'>
          <FetchProductsComponent /> {/* Call the FetchProductsComponent */}
          {productList.length > 0 ? (
            <HomeProducts products={productList} />
          ) : (
            <h2>No products to show</h2>
          )}
        </div>
      </div>
    </>
  );
};
//   const productList = useSelector((state: RootState) => state.products.productList); // Access productList from the Redux state
  
  

  
//   return (
//     <div className='wrapper'>
      
      
//         <h3 className='intro bg-black'>Welcome to <span className='shopy'>Shopy!</span></h3>
//         {/* <img src={Logo} alt="Shopy" className="shopyIntro"/> */}
//         <FetchProductsComponent /> {/* Call the FetchProductsComponent */}
//         {productList[0].imageURL.length > 0 ? (
//           <img className='fullwidth-img' src={productList[16].imageURL[3]} alt="Product"/>
//           ) : (
//             <p>No image available</p>
//             )}
   

//       {/* <div className='dividerDiv'>
//         <h4>Latest news!</h4>
//       </div> */}
//       {/* <LatestNews productList={productList}/> */}
//       <Link to="/store">
//         <button className='button btn-moreProducts'>More products</button>
//       </Link>


        
//     </div>
//   )
// }

export default Home