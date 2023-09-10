import React from 'react'
import { Link, Navigate } from 'react-router-dom'
import { ProductType } from '../../utils/types/product'
import AddToCartFunctions from './AddToCartFunction';


interface ProductListProps {
    products: ProductType[];
  }

const LatestNews: React.FC<ProductListProps> = ({ products }: ProductListProps) => {

    let productOne = products[1]
    let productTwo = products[9]
    let productThree = products[2]

  return (
      <div className='flexRow'>
        <Link className='productCard' to={`/product/${productOne.id}`}>
            {productOne.imageURL.length > 0 ? (
                <img className='productGridImage' src={productOne.imageURL[0]} alt="Product" />
                ) : (
                <p>No image available</p>
                )}
            <h4 className='productTitle'>{productOne.title}</h4>
            <div className='row'>
                <p><strong>Price: {productOne.price}$</strong></p>
                <AddToCartFunctions product={productOne} />
            </div>
            </Link>

            <Link className='productCard' to={`/product/${productTwo.id}`}>
            {productTwo.imageURL.length > 0 ? (
                <img className='productGridImage' src={productTwo.imageURL[0]} alt="Product" />
                ) : (
                <p>No image available</p>
                )}
            <h4 className='productTitle'>{productTwo.title}</h4>
            <div className='row'>
                <p><strong>Price: {productTwo.price}$</strong></p>
                <AddToCartFunctions product={productTwo} />
            </div>
            </Link>

            <Link className='productCard' to={`/product/${productThree.id}`}>
            {productThree.imageURL.length > 0 ? (
                <img className='productGridImage' src={productThree.imageURL[0]} alt="Product" />
                ) : (
                <p>No image available</p>
                )}
            <h4 className='productTitle'>{productThree.title}</h4>
            <div className='row'>
                <p><strong>Price: {productThree.price}$</strong></p>
                <AddToCartFunctions product={productThree} />
            </div>
        </Link>
    </div>
  )
}

export default LatestNews



