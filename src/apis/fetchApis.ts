const fetchApi = () => {
  const getData = async <T>(entrypoint: string): Promise<T> => {
    const response = await fetch(entrypoint);
    const data = await response.json();

    if (!response.ok) throw new Error(data.message);

    return data;
  };

  const postData = async <T>(
    postingData: T,
    entrypoint: string,
    endpoint: string
  ) => {
    const response = await fetch(entrypoint + endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postingData),
    });

    if (!response.ok) throw new Error();

    const location = response.headers.get('Location');

    return location;
  };

  const patchData = async <T>(
    patchingData: T,
    entrypoint: string,
    endpoint: string
  ) => {
    const response = await fetch(entrypoint + endpoint, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(patchingData),
    });

    if (!response.ok) throw new Error();
  };

  const deleteData = async (entrypoint: string, endpoint: string) => {
    const response = await fetch(entrypoint + endpoint, {
      method: 'DELETE',
    });

    if (!response.ok) throw new Error();
  };

  return { getData, postData, patchData, deleteData };
};

export default fetchApi;
