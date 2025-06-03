const tryApiCall = async <T>(apiCall: () => Promise<T>) => {
  try {
    const data = await apiCall();
    return { data, error: null };
  } catch (error) {
    return {
      data: undefined,
      error: error instanceof Error && error.message,
    };
  }
};

export default tryApiCall;
