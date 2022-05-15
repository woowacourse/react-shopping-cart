export const actionStarted = (stateName) => ({ type: `${stateName}_START` });

export const actionSucceeded = (stateName, payload) => ({
  type: `${stateName}_SUCCESS`,
  payload,
});

export const actionFailed = (stateName, payload) => ({
  type: `${stateName}_FAILURE`,
  payload,
});
