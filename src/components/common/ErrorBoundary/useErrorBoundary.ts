import { useState } from 'react';

const useErrorBoundary = () => {
  const [error, setError] = useState<Error | null>(null);

  if (error) {
    throw error;
  }

  return setError;
};

export default useErrorBoundary;
