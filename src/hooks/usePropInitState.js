import { useEffect, useState } from 'react';

function usePropInitState(prop) {
  const [state, setState] = useState(prop);

  useEffect(() => {
    setState(prop);
  }, [prop]);

  return [state, setState];
}

export default usePropInitState;
