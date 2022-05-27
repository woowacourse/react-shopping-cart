export const createPromiseThunk = (type, promiseCreator) => {
  const [SUCCESS, ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`];

  return (param) => async (dispatch) => {
    dispatch({ type });

    try {
      const { data } = await promiseCreator(param);
      dispatch({ type: SUCCESS, data });
    } catch (error) {
      dispatch({ type: ERROR });
    }
  };
};
