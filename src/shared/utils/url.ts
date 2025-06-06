export const buildQueryParams = (query?: Record<string, any>): URLSearchParams => {
  const params = new URLSearchParams();

  Object.entries(query || {}).forEach(([key, value]) => {
    if (value !== undefined && value !== null && String(value)) {
      params.append(key, String(value));
    }
  });

  return params;
};
