import React from 'react';

import Input from 'components/Input';

function Checkbox() {
  const handleChecbox = () => {};

  return (
    <Input
      onClick={handleChecbox}
      type="checkbox"
      width="28px"
      height="28px"
      border="1px solid #22A6A2"
    ></Input>
  );
}

export default Checkbox;
