import { useState } from 'react';

function useToggle(initial = false) {
  const [state, setState] = useState(initial);
  const toggle = () => setState((prev) => !prev);
  return [state, toggle, setState] as const;
}

export default useToggle;
