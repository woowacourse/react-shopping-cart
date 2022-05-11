import React from 'react';

import BlackText from 'components/BlackText';

function ProductTitle({ fontSize, fontWeight, children }) {
  return (
    <BlackText fontSize={fontSize} fontWeight={fontWeight}>
      {children}
    </BlackText>
  );
}

export default ProductTitle;
