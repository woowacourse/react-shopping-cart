export const reducerUtils = {
  initial: (initialData = null) => ({
    isLoading: false,
    data: initialData,
    error: null,
  }),

  loading: (prevState = null) => ({
    isLoading: true,
    data: prevState,
    error: null,
  }),

  success: (data) => ({
    isLoading: false,
    data,
    error: null,
  }),

  failure: (prevState = null, error) => ({
    isLoading: false,
    data: prevState,
    error,
  }),
};
