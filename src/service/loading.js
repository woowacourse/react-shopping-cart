export const showLoading = () => dispatch => {
  dispatch({ type: 'LOADING', payload: true });
};

export const hideLoading = () => dispatch => {
  dispatch({ type: 'LOADING', payload: false });
};
