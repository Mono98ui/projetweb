import React from 'react';

function searchPageImage(prop) {
  return (
    <div>
      <img
        src={prop.url} alt="oops" width={80}
        height={80}
      />
    </div>
  );
}

export default searchPageImage;
