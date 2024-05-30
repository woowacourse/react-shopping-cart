export const getQueryParamAsNumber = (query: URLSearchParams, param: string): number | null => {
  const value = query.get(param);
  if (value === null || value.trim() === "") return null;

  const numberValue = Number(value);
  return isNaN(numberValue) ? null : numberValue;
};
