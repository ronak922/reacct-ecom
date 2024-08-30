import React, { useState } from 'react';
import AddProduct from './AddProduct';
import DescriptionBox from './DescriptionBox';

const ParentComponent = () => {
  const [description, setDescription] = useState('');

  return (
    <div>
      <AddProduct setDescription={setDescription} />
      <DescriptionBox description={description} />
    </div>
  );
};

export default ParentComponent;
