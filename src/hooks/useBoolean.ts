import { useState } from 'react';

const useBoolean = () => {
  const [boolean, setBoolean] = useState(false);

  const setTrue = () => setBoolean(true);
  const setFalse = () => setBoolean(false);

  return { boolean, setTrue, setFalse };
};

export default useBoolean;
