import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../Context/ShopContext'; // Ensure correct import path
import Breadcrum from '../Components/Breadcrums/Breadcrum'; // Adjust the path as necessary
import ProductDisplay from '../Components/ProductDisplay/ProductDisplay'; // Adjust the path as necessary
import DescriptionBox from '../Components/DescriptionBox/DescriptionBox'; // Adjust the path as necessary
import RelatedProducts from '../Components/RelatedProducts/RelatedProducts'; // Adjust the path as necessary

const Product = () => {
  // Get productId from the URL parameters
  const { productId } = useParams();
  const context = useContext(ShopContext);

  // Check if context is available and contains `all_product`
  if (!context || !context.all_product) {
    return <div>Error: Context is not available or `all_product` is missing</div>;
  }

  const { all_product } = context;
  // Find the product based on the `productId`
  const product = all_product.find((e) => e.id === Number(productId));

  // Handle case where product is not found
  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div>
      {/* Pass the product object as a prop */}
      <Breadcrum product={product} />
      <ProductDisplay product={product} />
      <DescriptionBox product={product} /> {/* Pass product if needed */}
      <RelatedProducts productId={product.id} /> {/* Pass productId if needed */}
    </div>
  );
};

export default Product;
