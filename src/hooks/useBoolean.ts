import { useState } from 'react';

const useToast = () => {
  const [boolean, setBoolean] = useState(false);

  const setTrue = () => setBoolean(true);
  const setFalse = () => setBoolean(false);

  return { boolean, setTrue, setFalse };
};

export default useToast;
