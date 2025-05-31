type QueryParam = {
  name: string;
  value?: string | number | boolean | null;
};

export const buildQueryString = (queryParams: QueryParam[]) => {
  const params = new URLSearchParams();

  queryParams.forEach((param) => {
    if (param.value && param.value !== '')
      params.set(param.name, String(param.value));
  });

  return params.toString();
};
