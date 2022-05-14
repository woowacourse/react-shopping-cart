export const fetchStarted = stateName => ({ type: `${stateName}_FETCH_START` });

export const fetchSucceeded = (stateName, payload) => ({
  type: `${stateName}_FETCH_SUCCESS`,
  payload,
});

export const fetchFailed = (stateName, payload) => ({
  type: `${stateName}_FETCH_FAILURE`,
  payload,
});
