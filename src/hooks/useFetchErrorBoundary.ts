import { useEffect } from 'react';

function useFetchErrorBoundary(fetchError: Error | null) {
  useEffect(() => {
    if (fetchError) throw fetchError;
  }, [fetchError]);
}

export default useFetchErrorBoundary;
