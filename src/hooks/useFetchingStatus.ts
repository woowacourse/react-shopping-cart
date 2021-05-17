import { useState } from 'react';

const useFetchingStatus = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [responseOK, setResponseOK] = useState<boolean>(true);

  return { loading, setLoading, responseOK, setResponseOK };
};

export default useFetchingStatus;
