import React from 'react';

import Text from 'components/Text';

function ProductTitle({ children }) {
  return (
    <Text color="#333333" fontSize="1rem" fontWeight="400">
      {children}
    </Text>
  );
}

export default ProductTitle;
