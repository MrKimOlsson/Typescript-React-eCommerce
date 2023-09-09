import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { addProducts } from '../../store/products/productsService'
import '../../utils/styles/addProductForm.css'

const AddProductForm = () => {

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [shortDescription, setShortDescription] = useState('')
    const [price, setPrice] = useState(0)
    const [imageUrlOne, setImageUrlOne] = useState('')
    const [imageUrlTwo, setImageUrlTwo] = useState('')
    const [imageUrlThree, setImageUrlThree] = useState('')
    const [imageUrlFour, setImageUrlFour] = useState('')
    const [imageUrlFive, setImageUrlFive] = useState('')
    const [category, setCategory] = useState('')

    const navigate = useNavigate()

    const addNewThread = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

    // Create an array to store image URLs
    const imageUrls = [];

    // Push individual image URLs into the array
    if (imageUrlOne) imageUrls.push(imageUrlOne);
    if (imageUrlTwo) imageUrls.push(imageUrlTwo);
    if (imageUrlThree) imageUrls.push(imageUrlThree);
    if (imageUrlFour) imageUrls.push(imageUrlFour);
    if (imageUrlFive) imageUrls.push(imageUrlFive);


        // Generate a random 20 letter ID string
        function generateRandomString(length: number) {
          const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
          let randomString = '';
        
          for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            randomString += characters.charAt(randomIndex);
          }

          return randomString;
        }
        
        // Get the random ID
        const randomId = generateRandomString(20);
       
        addProducts({
          id: randomId,
          title,
          description,
          shortDescription,
          category,
          imageURL: imageUrls, // Set the array of image URLs
          price,
        });
            navigate('/')
    }

  return (
    <form onSubmit={(e) => addNewThread(e)} className='thread-form'>
        <div className="input-group">
            <label htmlFor="title" className='form-label'>Title</label>
            <input
             required
             onChange={(e) => setTitle(e.target.value)} 
             type="text" 
             className='form-control' 
             id='title'  
             value={title}
             />
        </div>
        <div className="input-group">
            <label htmlFor="description" className='form-label'>Description</label>
            <textarea
             required
             value={description}
             onChange={(e) => setDescription(e.target.value)}
             className='form-textarea' 
             name="description" 
             id="description"> 
             </textarea>
        </div>

        <div className="input-group">
            <label htmlFor="shortDescription" className='form-label'>Short description</label>
            <textarea
             required
             value={shortDescription}
             onChange={(e) => setShortDescription(e.target.value)}
             className='form-shortTextarea' 
             name="shortDescription" 
             id="shortDescription"> 
             </textarea>
        </div>

        <div className="input-group">
          <label htmlFor="price" className="form-label">
            Price
          </label>
          <input
            type="number"
            required
            value={price} // Use the state variable 'price' for value
            onChange={(e) => setPrice(Number(e.target.value))} // Convert input value to a number
            className="form-control"
            name="price"
            id="price"
            />
        </div>

        <div className="input-group">
            <label htmlFor="imageUrlOne" className='form-label'>Image one</label>
             <input
             required
             value={imageUrlOne}
             onChange={(e) => setImageUrlOne(e.target.value)} 
             type="text" 
             className='form-control' 
             name="imageUrlOne" 
             id="imageUrlOne"
             />

        </div>

        <div className="input-group">
            <label htmlFor="imageUrlTwo" className='form-label'>Image two</label>
            <input
             required
             value={imageUrlTwo}
             onChange={(e) => setImageUrlTwo(e.target.value)}
             className='form-control' 
             name="imageUrlTwo" 
             id="imageUrlTwo"
             />
        </div>

        <div className="input-group">
            <label htmlFor="imageUrlThree" className='form-label'>Image three</label>
            <input
             required
             value={imageUrlThree}
             onChange={(e) => setImageUrlThree(e.target.value)}
             className='form-control' 
             name="imageUrlThree" 
             id="imageUrlThree" 
             />
        </div>

        <div className="input-group">
            <label htmlFor="imageUrlFour" className='form-label'>Image four</label>
            <input
             required
             value={imageUrlFour}
             onChange={(e) => setImageUrlFour(e.target.value)}
             className='form-control' 
             name="imageUrlFour" 
             id="imageUrlFour" 
             />
        </div>

        <div className="input-group">
            <label htmlFor="imageUrlFive" className='form-label'>Image five</label>
            <input
             required
             value={imageUrlFive}
             onChange={(e) => setImageUrlFive(e.target.value)}
             className='form-control' 
             name="imageUrlFive" 
             id="imageUrlFive" 
             />
        </div>

        <div className='input-group'>
            <label htmlFor="category" className='form-label'>Category</label>
            <select
             required
             className='form-select' 
             id='category'
             value={category}
             onChange={(e) => setCategory(e.target.value)}
             >
                <option value="footwear">Footwear</option>
                <option value="tshirt">T-Shirt</option>
                <option value="hoodie">Hoodie</option>
                <option value="pants">Pants</option>
             </select>
        </div>
        <button className='button' type='submit'>Publish</button>
    </form>
  )
}

export default AddProductForm