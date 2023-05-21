export const handleResponseError = async (response: Response) => {
  if (!response.ok) {
    const errorData = await response.json();

    if ('message' in errorData) {
      throw new Error(errorData.message);
    }

    throw new Error(response.status.toString());
  }
};
