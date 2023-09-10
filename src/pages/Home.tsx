import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/index';
import FetchProductsComponent from '../components/product/FetchProductsComponent';
import { Link } from 'react-router-dom';
import LatestNews from '../components/product/LatestNews';


// export let products: ProductType[] = []
const Home = () => {
  
  const productList = useSelector((state: RootState) => state.products.productList);
  <FetchProductsComponent /> 
  console.log(productList)
  return (
    <div className='wrapper'>
      
      <h3 className='intro'>Welcome to <span className='shopy'>Shopy!</span></h3>
      {/* <img src={Logo} alt="Shopy" className="shopyIntro"/> */}
      {productList[0].imageURL.length > 0 ? (
        <img className='fullwidth-img' src={productList[16].imageURL[3]} alt="Product"/>
        ) : (
          <p>No image available</p>
          )}

      <div className='dividerDiv'>
        <h4>Latest news!</h4>
      </div>
      <LatestNews productList={productList}/>
      <Link to="/store">
        <button className='button btn-moreProducts'>More products</button>
      </Link>


        
    </div>
  )
}

export default Home