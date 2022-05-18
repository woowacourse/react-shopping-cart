import React from 'react';

import BlackText from 'components/BlackText';

function ProductTitle({ children }) {
  return (
    <BlackText fontSize="1rem" fontWeight="400">
      {children}
    </BlackText>
  );
}

export default ProductTitle;
