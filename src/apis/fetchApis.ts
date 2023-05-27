const fetchApis = () => {
  const headers = {
    'Content-Type': 'application/json',
  };

  const handleFetchError = (
    responseOk: boolean,
    status: number,
    message: string
  ) => {
    if (!responseOk) throw new Error(`ERROR[${status}]: ${message}`);
  };

  const getData = async <T>(entrypoint: string): Promise<T> => {
    const response = await fetch(entrypoint);
    const data = await response.json();

    handleFetchError(response.ok, response.status, data.message);

    return data;
  };

  const postData = async <T>(
    postingData: T,
    entrypoint: string,
    endpoint: string
  ) => {
    const response = await fetch(entrypoint + endpoint, {
      method: 'POST',
      headers,
      body: JSON.stringify(postingData),
    });

    handleFetchError(response.ok, response.status, 'failed post data');

    return response.headers.get('Location');
  };

  const patchData = async <T>(
    patchingData: T,
    entrypoint: string,
    endpoint: string
  ) => {
    const response = await fetch(entrypoint + endpoint, {
      method: 'PATCH',
      headers,
      body: JSON.stringify(patchingData),
    });

    handleFetchError(response.ok, response.status, 'failed Patch data');
  };

  const deleteData = async (entrypoint: string, endpoint: string) => {
    const response = await fetch(entrypoint + endpoint, {
      method: 'DELETE',
    });

    handleFetchError(response.ok, response.status, 'failed Delete data');
  };

  return { getData, postData, patchData, deleteData };
};

export default fetchApis;
