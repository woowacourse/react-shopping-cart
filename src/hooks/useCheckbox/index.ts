import { useState } from 'react';

const useCheckbox = () => {
  const [checked, setChecked] = useState(false);

  return { checked, setChecked };
};

export default useCheckbox;
