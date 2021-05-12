export const createAsyncThunk = (type, asyncFunc) => {
  const [SUCCESS, FAILURE] = [`${type}_SUCCESS`, `${type}_FAILURE`];

  return (param, errorCallback) => async (dispatch) => {
    dispatch({ type });
    try {
      if (!param) {
        const payload = await asyncFunc();
        dispatch({ type: SUCCESS, payload });

        return;
      }

      await asyncFunc(param);
      dispatch({ type: SUCCESS, payload: param });
    } catch (error) {
      errorCallback && errorCallback();
      console.error(error);
      dispatch({ type: FAILURE, payload: error });
    }
  };
};
