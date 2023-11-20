import React from 'react'
import { IoGameController } from 'react-icons/io5';


const NoGameFound = () => {
  return (
    <div>
      <IoGameController style={{fontSize:'150px'}}/>
      <h2>No Games Found</h2>
    </div>
  );
}

export default NoGameFound