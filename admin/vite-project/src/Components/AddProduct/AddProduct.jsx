import React, { useState, useEffect } from 'react';
import uploadarea from '../../assets/upload_area.svg';
import './AddProduct.css';

const AddProduct = ({ setDescription }) => {
  const [productDetails, setProductDetails] = useState({
    name: '',
    old_price: '',
    new_price: '',
    category: '',
    description: '',
    tags: '',
    mainImage: null,
    thumbnails: [],
  });

  const [imagePreviews, setImagePreviews] = useState({
    mainImage: null,
    thumbnails: [],
  });

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle image file change
  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);
    if (files.length > 0) {
      const mainImage = files[0];
      const thumbnails = files.slice(1, 5); // Only take up to 4 additional images

      setProductDetails((prevState) => ({
        ...prevState,
        mainImage,
        thumbnails,
      }));

      // Clean up old image URLs
      imagePreviews.mainImage && URL.revokeObjectURL(imagePreviews.mainImage);
      imagePreviews.thumbnails.forEach(preview => URL.revokeObjectURL(preview));

      const newImagePreviews = {
        mainImage: URL.createObjectURL(mainImage),
        thumbnails: thumbnails.map(file => URL.createObjectURL(file)),
      };

      setImagePreviews(newImagePreviews);
    }
  };

  // Validate the form fields
  const isFormValid = () => {
    const { old_price, new_price, mainImage, thumbnails, description, tags } = productDetails;
    return (
      productDetails.name.trim() !== '' &&
      !isNaN(old_price) && old_price.trim() !== '' &&
      !isNaN(new_price) && new_price.trim() !== '' &&
      productDetails.category !== '' &&
      mainImage !== null &&
      thumbnails.length > 0 &&
      description.trim() !== '' &&
      tags.trim() !== ''
    );
  };

  // Handle form submission
  const handleAddProduct = async () => {
    if (!isFormValid()) {
      window.alert('Please fill in all required fields correctly.');
      return;
    }

    try {
      console.log('Submitting product details:', productDetails);

      const formData = new FormData();
      formData.append('name', productDetails.name);
      formData.append('old_price', productDetails.old_price);
      formData.append('new_price', productDetails.new_price);
      formData.append('category', productDetails.category);
      formData.append('description', productDetails.description);
      formData.append('tags', productDetails.tags);
      formData.append('mainImage', productDetails.mainImage, productDetails.mainImage.name);

      productDetails.thumbnails.forEach((image) => {
        formData.append('thumbnails', image, image.name);
      });

      const response = await fetch('http://localhost:4000/addproduct', {
  method: 'POST',
  body: formData,
});


      if (response.ok) {
        const data = await response.json();
        console.log('Product added successfully:', data);

        if (typeof setDescription === 'function') {
          setDescription(productDetails.description);
        } else {
          console.error('setDescription is not a function');
        }

        window.alert('Product added successfully!');
        setProductDetails({
          name: '',
          old_price: '',
          new_price: '',
          category: '',
          description: '',
          tags: '',
          mainImage: null,
          thumbnails: [],
        });
        setImagePreviews({
          mainImage: null,
          thumbnails: [],
        });
      } else {
        const errorData = await response.json();
        console.error('Error adding product:', errorData);
        window.alert('Error adding product: ' + (errorData.message || 'Unknown error'));
      }
    } catch (error) {
      console.error('Error during form submission:', error);
      window.alert('Error during form submission: ' + error.message);
    }
  };

  return (
    <div className='add-product'>
      <div className="addproduct-itemfield">
        <p>Product title</p>
        <input
          type="text"
          name='name'
          value={productDetails.name}
          onChange={handleInputChange}
          placeholder='Type Here'
        />
      </div>
      <div className="addproduct-price">
        <p>Price</p>
        <input
          type="text"
          name='old_price'
          value={productDetails.old_price}
          onChange={handleInputChange}
          placeholder='Type here'
        />
      </div>
      <div className="addproduct-price">
        <p>Offer Price</p>
        <input
          type="text"
          name='new_price'
          value={productDetails.new_price}
          onChange={handleInputChange}
          placeholder='Type here'
        />
      </div>
      <div className="addproductitem-field">
        <p>Product Category</p>
        <select
          name="category"
          value={productDetails.category}
          onChange={handleInputChange}
          className='add-product-selector'
        >
          <option value="">Select a category</option>
          <option value="men">Men</option>
          <option value="women">Women</option>
          <option value="kids">Kids</option>
        </select>
      </div>
      <div className="addproduct-itemfield">
        <p>Description</p>
        <textarea
          name="description"
          value={productDetails.description}
          onChange={handleInputChange}
          placeholder='Type product description here'
        />
      </div>
      <div className="addproduct-itemfield">
        <p>Tags</p>
        <input
          type="text"
          name="tags"
          value={productDetails.tags}
          onChange={handleInputChange}
          placeholder='Comma separated tags (e.g., summer, sale, trendy)'
        />
      </div>
      <div className="addproduct-items-field">
        <label htmlFor="file-input">
          <img
            src={imagePreviews.mainImage || uploadarea}
            className='add-product-img-thumbnail'
            alt="Upload Area"
          />
        </label>
        <input
          type="file"
          name="images"
          id='file-input'
          hidden
          multiple
          onChange={handleImageChange}
        />
        <div className="addproduct-images-preview">
          {imagePreviews.thumbnails.map((preview, index) => (
            <img
              key={index}
              src={preview}
              className='add-product-img-thumbnail'
              alt={`Preview ${index + 1}`}
            />
          ))}
        </div>
      </div>
      <button
        className='add-button'
        disabled={!isFormValid()}
        onClick={handleAddProduct}
      >
        Add product
      </button>
    </div>
  );
};

export default AddProduct;
