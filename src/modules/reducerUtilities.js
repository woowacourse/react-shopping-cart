const updateObject = (state, newValues) => {
  return {
    ...state,
    ...newValues,
  };
};

export default updateObject;
