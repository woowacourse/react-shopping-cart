export const reducerUtils = {
  initial: (initialData = null) => ({
    loading: false,
    data: initialData,
    error: null,
  }),

  loading: (prevState = null) => ({
    loading: true,
    data: prevState,
    error: null,
  }),

  success: (data) => ({
    loading: false,
    data,
    error: null,
  }),

  failure: (prevState = null, error) => ({
    loading: false,
    data: prevState,
    error,
  }),
};
