const tryApiCall = async <T>(
  apiCall: () => Promise<T>,
  openToast: (message: string, isSuccess: boolean) => void,
  successMessage: string
) => {
  try {
    const data = await apiCall();
    openToast(successMessage, true);
    return data;
  } catch (error) {
    if (error instanceof Error) {
      openToast(error.message, false);
    }
    return undefined;
  }
};

export default tryApiCall;
