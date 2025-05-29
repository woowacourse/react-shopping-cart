const tryApiCall = async <T>(
  apiCall: () => Promise<T>,
  handleErrorToast: (errorMessage: string) => void
) => {
  try {
    const data = await apiCall();
    return data;
  } catch (error) {
    console.log(error);
    return undefined;
  }
};

export default tryApiCall;
