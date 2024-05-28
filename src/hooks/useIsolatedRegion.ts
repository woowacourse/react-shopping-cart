import { useState } from 'react';

const useIsolatedRegion = () => {
  const [isolatedRegion, setIsolatedRegion] = useState(false);

  const handleIsolatedRegion = () => {
    setIsolatedRegion(prev => !prev);
  };

  return {
    isolatedRegion,
    handleIsolatedRegion,
  };
};
export default useIsolatedRegion;
