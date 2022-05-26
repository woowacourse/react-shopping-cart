import React from 'react';

import Text from 'components/Text';

function ProductTitle({ onClick, id, children }) {
  return (
    <Text
      onClick={onClick}
      id={id}
      color="#333333"
      fontSize="1rem"
      fontWeight="400"
      cursor="pointer"
    >
      {children}
    </Text>
  );
}

export default ProductTitle;
