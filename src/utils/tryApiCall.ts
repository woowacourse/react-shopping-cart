interface ApiCallResult<T> {
  data: T | undefined;
  error: string | null;
}

const tryApiCall = async <T>(
  apiCall: () => Promise<T>
): Promise<ApiCallResult<T>> => {
  try {
    const data = await apiCall();
    return { data, error: null };
  } catch (error) {
    return {
      data: undefined,
      error:
        error instanceof Error && error.message
          ? error.message
          : 'Unknown error occurred',
    };
  }
};

export default tryApiCall;
