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
    console.log("작동");
    return undefined;
  }
};

export default tryApiCall;
