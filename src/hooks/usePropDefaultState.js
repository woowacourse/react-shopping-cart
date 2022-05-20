import { useEffect, useState } from 'react';

function usePropDefaultState(prop) {
  const [state, setState] = useState(prop);

  useEffect(() => {
    setState(prop);
  }, [prop]);

  return [state, setState];
}

export default usePropDefaultState;
